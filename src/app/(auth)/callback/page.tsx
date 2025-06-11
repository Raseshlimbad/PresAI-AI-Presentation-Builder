import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
  // Authenticate the user  
  const auth = await onAuthenticateUser();

  // Redirect based on authentication status
  if (auth.status === 200 || auth.status === 201) {
    redirect("/dashboard");
  } else if (
    auth.status === 400 ||
    auth.status === 403 ||
    auth.status === 500
  ) {
    redirect("/sign-in");
  }

  // Fallback render (should never be visible)
  return <p>Redirecting...</p>;
};

export default AuthCallbackPage;







// 'use server'
// // app/(auth)/callback/page.tsx

// import { onAuthenticateUser } from "@/actions/user";
// import { redirect } from "next/navigation";

// // Auth Callback Page
// const AuthCallbackPage = async () => {
//   // Authenticate the user  
//   const auth = await onAuthenticateUser();

//   // If the user is authenticated, redirect to the dashboard
//   if (auth.status === 200 || auth.status === 201) {
//     redirect("/dashboard");
//   } else if (
//     auth.status === 400 ||
//     auth.status === 403 ||
//     auth.status === 500
//   ) {
//     redirect("/sign-in");
//   }

//   return null; // Ensure the page doesn't render anything while the redirect happens
// };

// export default AuthCallbackPage;
