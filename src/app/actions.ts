"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();

  if (!email || !password) {
    return encodedRedirect("error", "/sign-up", "Email and password are required");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `http://localhost:3000/auth/callback` },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  }

  // 🔹 Get the authenticated user


  const user = data.user;
  console.log(user);

  if (!user) {
    console.error("User object is null!");
    return;
  }

  console.log("User ID:", user.id);
  console.log("User Email:", user.email);


  // 🔹 Check if user already exists
  const { data: existingUser, error: fetchError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") { // Ignore "row not found" errors
    console.error("Error checking existing profile:", fetchError.message);
    return;
  }

  if (existingUser) {
    console.log("User already exists in profiles. Skipping insert.");
    return;
  }

  // 🔹 Insert into Profiles Table
  const { error: profileError } = await supabase.from("profiles").insert([
    {
      user_id: user.id,
      username: user.email.split("@")[0], 
      role: "user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  if (profileError) {
    console.error("Profile Insertion Error:", profileError.message);
  } else {
    console.log("✅ Profile successfully inserted!");
  }
};



export const signInwithOAuthAction = async () => {
  console.log("Signing in with Google");
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `http://localhost:3000/auth/callback` },
  });

  if (error) {
    console.error("OAuth ERROR:", error.message);
    return;
  }

  console.log("OAuth Data:", data);

  // 🔹 Fetch the authenticated user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error("User fetch error:", userError.message);
    return;
  }

  console.log("Authenticated User:", userData);

  const user = userData.user;
  if (!user) {
    console.error("User object is null!");
    return;
  }

  console.log("User ID:", user.id);
  console.log("User Email:", user.email);

  // 🔹 Check if user already exists
  const { data: existingUser, error: fetchError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") { // Ignore "row not found" errors
    console.error("Error checking existing profile:", fetchError.message);
    return;
  }

  if (existingUser) {
    console.log("User already exists in profiles. Skipping insert.");
    return;
  }

  // 🔹 Insert into Profiles Table
  const { error: profileError } = await supabase.from("profiles").insert([
    {
      user_id: user.id,
      username: user.email.split("@")[0], 
      role: "user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  if (profileError) {
    console.error("Profile Insertion Error:", profileError.message);
  } else {
    console.log("✅ Profile successfully inserted!");
  }
};




export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `http://localhost:3000/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
};