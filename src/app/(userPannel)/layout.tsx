import Footer from "@/layout/userPannel/Footer";
import Header from "@/layout/userPannel/Header";


export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="pt-20">
                {children}
            </main>
            <Footer />
        </>
    );
}
