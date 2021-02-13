/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import Clock from "../../subheader/components/Clock";
// import BreadCrumbs from '../../subheader/components/BreadCrumbs'
export function HeaderMenu({ layoutProps }) {
  return (
    <div
      id="kt_header_menu"
      className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      {/*begin::Header Nav*/}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <div className="d-flex align-items-center">
          <a
            className="btn btn-light btn-sm font-weight-bold"
            id="kt_dashboard_daterangepicker"
            data-toggle="tooltip"
            title="Select dashboard daterange"
            data-placement="left"
          >
            {/* <span className="text-muted font-weight-bold mr-2" id="kt_dashboard_daterangepicker_title">Today</span> */}
            <Clock></Clock>
          </a>
        </div>
      </ul>
      {/*end::Header Nav*/}
    </div>
  );
}
