import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
import HomePage from "../components/HomePage";

export default function Home() {
  return (
    <>
      <MainLayout>
        <div className="center">
          <HomePage />
        </div>
      </MainLayout>
    </>
  )
}
