import { compose } from "@reduxjs/toolkit";
import { withStore } from "./with-store";
import { withRouter } from "./with-router";
import React from "react";

export const withProviders = compose<React.ComponentType>(withStore, withRouter) 