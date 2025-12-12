import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

const columnOne = [
  { label: "Service", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Affiliate Program", href: "#" },
  { label: "About Us", href: "#" },
];

const columnTwo = [
  { label: "Dashboard", href: "#" },
  { label: "Platform", href: "#" },
  { label: "Workout Library", href: "#" },
  { label: "App Design", href: "#" },
];

const columnThree = [{ label: "About Us", href: "#" }];

export default function Footer() {
  return (
    <footer className="w-full bg-white text-gray-900 transition-colors rounded-t-3xl dark:bg-gray-800 dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 sm:px-10 lg:px-12">
        {/* Top */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand + Social */}
          <div className="max-w-md space-y-5">
            <div className="flex items-center gap-3 text-xl font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-orange-400 text-orange-500">
                <span className="sr-only">Logo</span>
                <div className="h-4 w-4 rounded-sm border-2 border-orange-500" />
              </div>
              <span>Opion</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Ease of shopping is our main focus. With powerful search
              features and customizable filters, you can easily find the
              products you are looking for.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold">Subscribe to Newsletter</p>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter Your Email Here"
                  className="h-11 pl-10 text-sm bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid w-full max-w-2xl grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterColumn title="Get Started" items={columnOne} />
            <FooterColumn title="Get Started" items={columnTwo} />
            <FooterColumn title="Get Started" items={columnThree} />
          </div>
        </div>

        <Separator className="bg-gray-200 dark:bg-gray-800" />

        {/* Bottom */}
        <div className="flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <span>2024 MaxFit</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gray-900 dark:hover:text-white">
              Twitter
            </Link>
            <span className="text-gray-300 dark:text-gray-600">—</span>
            <Link href="#" className="hover:text-gray-900 dark:hover:text-white">
              Instagram
            </Link>
            <span className="text-gray-300 dark:text-gray-600">—</span>
            <Link href="#" className="hover:text-gray-900 dark:hover:text-white">
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

type ColumnItem = { label: string; href: string };

function FooterColumn({ title, items }: { title: string; items: ColumnItem[] }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">{title}</p>
      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="hover:text-gray-900 dark:hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

