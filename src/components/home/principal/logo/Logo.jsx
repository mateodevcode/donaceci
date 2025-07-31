import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src={"/logo/logo.png"}
        alt="Logo"
        width={400}
        height={400}
        className="h-16 md:h-24 lg:h-40 w-auto border-4 border-white rounded-full bg-white"
      />
    </Link>
  );
};

export default Logo;
