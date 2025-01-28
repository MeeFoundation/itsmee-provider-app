import { Cookie, AvatarHelper } from "mee-components";
import config from "@config";

export function checkProvider(authPages?: boolean) {
  const provider = Cookie.getCookie("provider");
  if (!authPages && !provider) {
    window.location.hash = "sign-in";
    return false;
  } else if (authPages === true && !!provider) {
    window.location.hash = "";
    return false;
  }

  if (!authPages && provider && window.location.hash) {
    const agreementConfirmed = Cookie.getCookie("agreement-confirmed");
    if (!agreementConfirmed) {
      window.location.hash = "declined-license";
      return false;
    }
  }

  return true;
}

export async function initHeader() {
  const profiles = document.querySelectorAll(".profile");
  const signOutButton = document.getElementById("sign-out");
  let isProfileModalOpened = false;
  const profileModal = document.getElementById("profile-modal");
  const profileName = document.getElementById("profile-name");
  const openProfileModals = document.querySelectorAll(
    ".open-profile-modal",
  ) as NodeListOf<HTMLElement>;
  const menu = document.getElementById("menu");

  const toggleProfile = () => {
    if (isProfileModalOpened) {
      openProfileModals.forEach((openProfileModal) => {
        delete openProfileModal.dataset.active;
      });

      profileModal?.classList.remove("flex");
      profileModal?.classList.add("hidden");
    } else {
      openProfileModals.forEach((openProfileModal) => {
        openProfileModal.dataset.active = "true";
      });

      profileModal?.classList.remove("hidden");
      profileModal?.classList.add("flex");
    }

    isProfileModalOpened = !isProfileModalOpened;
  };
  openProfileModals.forEach((openProfileModal) => {
    openProfileModal.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleProfile();
    });
  });

  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();

  const randomUser = data.results[0];
  if (randomUser) {
    profiles.forEach((profile) => profile.classList.remove("hidden"));
    menu?.classList.add("hidden");
    if (profileName) {
      profileName.innerHTML = randomUser.email;
    }
    AvatarHelper.setAvatar(
      ".profile-image-preview",
      `${randomUser.name.first} ${randomUser.name.last}`,
      randomUser.picture.medium,
    );
    AvatarHelper.setAvatar(
      ".profile-image",
      `${randomUser.name.first} ${randomUser.name.last}`,
      randomUser.picture.medium,
    );
  }

  signOutButton?.addEventListener("click", () => {
    Cookie.deleteCookie("provider", config.cookieDomain);
    window.location.hash = "#sign-in";
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
}
