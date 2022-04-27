import React from "react";
import { withStyles } from "@material-ui/core/styles";

import GenericApp from "@iobroker/adapter-react/GenericApp";
//import ObjectTreeView from "./components/ObjectTreeView";
//import TreeView_backup from "./components/TreeView_backup";
import TreeLayout from "./components/TreeLayout";

/**
 * @type {(_theme: Theme) => import("@material-ui/styles").StyleRules}
 */
const styles = (_theme) => ({
	root: {},
});

class TabApp extends GenericApp {
	constructor(props) {
		const extendedProps = {
			...props,
			bottomButtons: false,
			encryptedFields: [],
			translations: {
				"en": require("./i18n/en.json"),
				"de": require("./i18n/de.json"),
			},
		};
		super(props, extendedProps);
	}

	onConnectionReady() {
		// executed when connection is ready
	}

	render() {
		if (!this.state.loaded) {
			return super.render();
		}

		return (
			<div className="App">
				<TreeLayout />
				{this.renderError()}
				{this.renderToast()}
			</div>
		);
	}
}

export default withStyles(styles)(TabApp);