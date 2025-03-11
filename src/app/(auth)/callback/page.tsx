import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

// Auth Callback Page
const AuthCallbackPage = async () => {
  // Authenticate the user  
  const auth = await onAuthenticateUser();

  // If the user is authenticated, redirect to the dashboard
  if (auth.status === 200 || auth.status === 201) {
    redirect("/dashboard");
    // If the user is not authenticated, redirect to the sign in page
  } else if (
    auth.status === 400 ||
    auth.status === 403 ||
    auth.status === 500
  ) {
    redirect("/sign-in");
  }
};

export default AuthCallbackPage;
