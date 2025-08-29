"use client";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MoreVertical, Eye, UserPlus, MapPin, XCircle, Download } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Group 73: Small popup card used from vertical three dots in tables
// Dimensions in design: 341 x 157 px (desktop)
// We'll render a fixed width container (w-[341px]) with rounded corners and shadow

export default function KebabMenu({ items, orderId, entityId, entityType = 'order', basePath }) {
  const router = useRouter();
  
  // Use entityId if provided, otherwise fall back to orderId for backward compatibility
  const id = entityId || orderId;
  
  // Determine the base path based on entity type or custom basePath
  let defaultBasePath;
  if (basePath) {
    defaultBasePath = basePath;
  } else {
    switch (entityType) {
      case 'customer':
        defaultBasePath = '/customers';
        break;
      case 'driver':
        defaultBasePath = '/drivers';
        break;
      case 'partner':
        defaultBasePath = '/partners';
        break;
      case 'order':
      default:
        defaultBasePath = '/orders';
        break;
    }
  }
  
  const getDefaultItems = () => {
    switch (entityType) {
      case 'customer':
        return [
          { id: "view", label: "View details", icon: Eye, href: `${defaultBasePath}/${id}` },
          { id: "edit", label: "Edit customer", icon: UserPlus },
          { id: "suspend", label: "Suspend", icon: XCircle, danger: true },
        ];
      case 'driver':
        return [
          { id: "view", label: "View details", icon: Eye, href: `${defaultBasePath}/${id}` },
          { id: "track", label: "Track location", icon: MapPin },
          { id: "suspend", label: "Suspend", icon: XCircle, danger: true },
        ];
      case 'partner':
        return [
          { id: "view", label: "View details", icon: Eye, href: `${defaultBasePath}/${id}` },
          { id: "edit", label: "Edit partner", icon: UserPlus },
          { id: "suspend", label: "Suspend", icon: XCircle, danger: true },
        ];
      case 'order':
      default:
        return [
          { id: "view", label: "View details", icon: Eye, href: `${defaultBasePath}/${id}` },
          { id: "assign", label: "Assign driver", icon: UserPlus },
          { id: "track", label: "Track on map", icon: MapPin },
          { id: "cancel", label: "Cancel order", icon: XCircle, danger: true },
        ];
    }
  };

  const menuItems = items?.length ? items : getDefaultItems();
  
  const handleItemClick = (item) => {
    if (item.href) {
      router.push(item.href);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="mobile-touch-target p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 focus:outline-none"
          aria-label="Actions"
        >
          <MoreVertical className="w-4 h-4" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 mt-2 w-48 sm:w-[341px] origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-xl ring-1 ring-black/5 focus:outline-none z-50"
        >
          <div className="py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Menu.Item key={item.id}>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`w-full px-3 py-3 sm:py-2 flex items-center rounded-lg text-left mobile-touch-target ${
                        active ? "bg-gray-50" : ""
                      } ${item.danger ? "text-red-600" : "text-gray-800"}`}
                      onClick={() => handleItemClick(item)}
                    >
                      {Icon && (
                        <span className={`mr-3 ${item.danger ? "text-red-500" : "text-gray-500"}`}>
                          <Icon className="w-4 h-4" />
                        </span>
                      )}
                      <span className="mobile-text-sm sm:text-sm font-medium truncate">{item.label}</span>
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
