import { AvatarHelper } from "mee-components";
import initProfileModal from "./ProfileModal";
import type { User } from "@utils/types";
import { getUserData, subscribeUserData } from "@store/UserStore";

const setUserData = (user?: User) => {
  const profiles = document.querySelectorAll(".profile");
  const menu = document.getElementById("menu");

  if (user) {
    profiles.forEach((profile) => profile.classList.remove("hidden"));
    menu?.classList.add("hidden");
    AvatarHelper.setAvatar(
      ".profile-image-preview",
      `${user.name.first} ${user.name.last}`,
      user.picture.medium,
    );
  }
};

const checkUserPage = () => {
  const header = document.getElementById("header");
  const user_page = document.documentElement.dataset.user_page;

  if (user_page === "1") {
    header?.classList.remove("hidden")
  } else {
    header?.classList.add("hidden")
  }
}

export default async function initHeader() {
  checkUserPage();
  document.addEventListener("change-route", () => {
    checkUserPage()
  });
  const header = document.getElementById("header");

  document.addEventListener("scroll", () => {
    if (!header?.dataset.type || header?.dataset.type !== "dark") {
      if (window.scrollY > 50) {
        header?.classList.remove("h-27");
        header?.classList.add("h-17");
      } else {
        header?.classList.remove("h-17");
        header?.classList.add("h-27");
      }
    }
  });
  setUserData(getUserData());
  subscribeUserData(setUserData);
  initProfileModal();

  
}
