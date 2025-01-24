import { Cookie } from "mee-components";

export function checkProvider(authPages?: boolean) {
  const provider = Cookie.getCookie("provider");
  if (!authPages && !provider) {
    window.location.hash = "sign-in";
  } else if (authPages && provider) {
    window.location.hash = "";
  }

  if (!authPages && provider && window.location.hash) {
    const agreementConfirmed = Cookie.getCookie("agreement-confirmed");
    if (!agreementConfirmed) {
      window.location.hash = "declined-license";
    }
  }
}
