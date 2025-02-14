import { Cookie } from "mee-components";

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
