"use client"

import { usePolkadot } from "@/context";
import { truncateWalletAddress } from "@/utils";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoImage from "../../public/logo/com.webp";
import { ThemeSwitcher } from "./themeswitcher";

import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, message, Space } from "antd";

const handleMenuClick: MenuProps["onClick"] = (e) => {
  message.info("Click on menu item.");
  // console.log('click', e);
};
export default function NavigationBar() {
  const router = useRouter();
  const { isInitialized, handleConnect, selectedAccount } = usePolkadot();
  const items: MenuProps["items"] = [
    {
      label:
        isInitialized && selectedAccount
          ? truncateWalletAddress(selectedAccount.address)
          : "Connect Polkadot",
      key: "1",
      onClick: handleConnect,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full dark:bg-gray-500 bg-gray-100 shadow-md opacity-95 py-0 my-4 dark:text-white z-10">
        <div className="min-h-full">
          <div className="mx-auto px-44 lg:px-44">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link href="/">
                  <Image
                    style={{
                      width: "auto",
                      height: "4rem",
                      marginRight: "-0.25rem",
                    }}
                    src={LogoImage}
                    alt="Commune Logo"
                    width={64}
                    height={64}
                  />
                </Link>

                <Menu as="div" className="flex relative ml-3">
                  <div>
                    <Menu.Button
                      style={{ marginLeft: "18rem" }}
                      className={classNames(
                        "dark:text-white dark:hover:text-[#92400E] p-0 text-2xl"
                      )}
                      onClick={() => router.push("/")}
                    >
                      Home
                    </Menu.Button>
                  </div>
                </Menu>
                <Menu as="div" className="flex relative ml-3">
                  <div>
                    <Menu.Button
                      style={{ marginLeft: "3rem" }}
                      className={classNames(
                        "dark:text-white dark:hover:text-[#92400E] p-0 text-2xl"
                      )}
                      onClick={() => router.push("/chat")}
                    >
                      Scraping
                    </Menu.Button>
                  </div>
                </Menu>
                <Menu as="div" className="flex relative ml-3">
                  <div>
                    <Menu.Button
                      style={{ marginLeft: "3rem" }}
                      className={classNames(
                        "dark:text-white dark:hover:text-[#92400E] p-0 text-2xl"
                      )}
                      onClick={() => router.push("/about")}
                    >
                      About
                    </Menu.Button>
                  </div>
                </Menu>
                <Menu as="div" className="flex relative ml-3">
                  <div>
                    <Menu.Button
                      style={{ marginLeft: "3rem" }}
                      className={classNames(
                        "dark:text-white dark:hover:text-[#92400E] p-0 text-2xl"
                      )}
                      onClick={() => router.push("/contact")}
                    >
                      Contact
                    </Menu.Button>
                  </div>
                </Menu>
              </div>

              <div className="hidden md:block ">
                <div className="flex items-center relative">
                  {/* <ThemeSwitcher /> */}
                  <Dropdown
                    menu={menuProps}
                    overlayStyle={{ width: "100px" }}
                    className="dark:bg-gray-700 dark:text-white text-xl mx-5 h-12"
                  >
                    <Button className="text-xl rounded-lg border-2 border-white">
                      <Space>
                        Connect Wallet
                        <DownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
