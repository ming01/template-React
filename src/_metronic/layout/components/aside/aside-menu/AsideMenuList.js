/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { useSelector } from "react-redux";
import { ROLES } from "../../../../../Constants";
import Hoc from "../../../../../app/modules/Common/components/Hoc";
import DvrIcon from "@material-ui/icons/Dvr";
import Icon from "@material-ui/core/Icon";

import DesktopMacIcon from "@material-ui/icons/DesktopMac";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const authReducer = useSelector(({ auth }) => auth);

  const isShowMenu = (roles) => {
    roles = roles === undefined ? [] : roles;
    if (roles.length > 0) {
      // check if route is restricted by role
      let intersection = roles.filter((x) => authReducer.roles.includes(x));
      return intersection.length > 0;
    } else {
      return true;
    }
  };

  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <Hoc>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/* begin::section */}
        <li className="menu-section ">
          <h4 className="menu-text">Menu Product</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* end:: section */}

        {/*begin::1 newProductGroup*/}
        {/* <li
          className={`menu-item ${getMenuItemActive(
            "/productgroup/new",
            false
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/productgroup/new">
            <span className="svg-icon menu-icon">
              <Icon>add</Icon>
            </span>
            <span className="menu-text">New ProductGroup</span>
          </NavLink>
        </li> */}
        {/*End::1 newProductGroup*/}

        {/*begin::1 ProductGroupList*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/ProductGroupList/",
            false
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/ProductGroupList/">
            <span className="svg-icon menu-icon">
              <DesktopMacIcon></DesktopMacIcon>
            </span>
            <span className="menu-text">ProductGroupList</span>
          </NavLink>
        </li>
        {/*End::1 ProductGroupList*/}
        {/*begin::1 newProduct*/}
        {/* <li
          className={`menu-item ${getMenuItemActive("/product/new", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/product/new">
            <span className="svg-icon menu-icon">
              <Icon>add</Icon>
            </span>
            <span className="menu-text">New Product</span>
          </NavLink>
        </li> */}
        {/*End::1 newProduct*/}
        {/*begin::1 ProductList*/}
        <li
          className={`menu-item ${getMenuItemActive("/ProductList/", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/ProductList/">
            <span className="svg-icon menu-icon">
              <DesktopMacIcon></DesktopMacIcon>
            </span>
            <span className="menu-text">ProductList</span>
          </NavLink>
        </li>
        {/*End::1 ProductList*/}

        {/*begin::1 ProductList*/}
        <li
          className={`menu-item ${getMenuItemActive("/stocklist/", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/stocklist/">
            <span className="svg-icon menu-icon">
              <DesktopMacIcon></DesktopMacIcon>
            </span>
            <span className="menu-text">StockList</span>
          </NavLink>
        </li>
        {/*End::1 ProductList*/}

        {/*begin::1 TestP*/}
        <li
          className={`menu-item ${getMenuItemActive("/TestP/", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/TestP/">
            <span className="svg-icon menu-icon">
              <DesktopMacIcon></DesktopMacIcon>
            </span>
            <span className="menu-text">TestP</span>
          </NavLink>
        </li>
        {/*End::1 TestP*/}
      </ul>
      {/* end::Menu Nav */}
    </Hoc>
  );
}
