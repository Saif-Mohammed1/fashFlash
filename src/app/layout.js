import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/component/navBar/navBar";
import AuthProvider from "@/component/provider/provider";
import { UserProvider } from "@/component/context/userContext";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { CartProvider } from "@/component/context/cartContext";
import Footer from "@/component/footer/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FashFlash",
  description: "FashFlash page",
};

export default async function RootLayout({ children }) {
  const mode = "dark";
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <UserProvider>
            <CartProvider session={session}>
              <NavBar session={session} />
              {children}
              <Footer />
            </CartProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
