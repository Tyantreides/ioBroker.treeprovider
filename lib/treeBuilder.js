

class treeBuilder {

	constructor(adapter) {
		console.log('create new treeBuilder instance')
		this.adapter = adapter;
		return this;
	}


	async getDataView(type, adapter = 'treeprovider', instance = '0') {
		//types: folder,
		this.watchedAdapter = adapter;
		this.watchedInstance = instance;
		let instanceRange = {
			"startkey": adapter+"."+instance,
			"endkey": adapter+"."+instance+".\u9999"
		}
		let objectList = [];
		await this.adapter.getObjectViewAsync('system', type, instanceRange, (err, result) => {
			this.adapter.log.debug('DataView polled.');
			this.adapter.log.debug(JSON.stringify(result));
			// objectList = result?.rows
			// if (objectList && objectList.length > 0) {
			// 	this.adapter.log.info('DataView polled and written.');
			// 	this.adapter.setStateAsync("config.treeData", { val: JSON.stringify(objectList), ack: true });
			// }
		});
		return objectList;
	}

	async subscribeStateChanges() {
		this.adapter.subscribeStates(this.watchedAdapter+"."+this.watchedInstance+"*");
	}

	async initDataFields () {
		let newRoot = {
			_id: this.adapter.namespace,
			type: 'device',
			common: {
				name: this.adapter.config.name
			},
			native: ''
		}

		await this.adapter.extendForeignObjectAsync(this.adapter.namespace, newRoot);

		await this.adapter.setObjectNotExistsAsync("objects", {
			type: "folder",
			common: {
				name: "objects",
			},
			native: {},
		});

		await this.adapter.setObjectNotExistsAsync("json", {
			type: "folder",
			common: {
				name: "config",
			},
			native: {},
		});

		await this.adapter.setObjectNotExistsAsync("json.treeData", {
			type: "state",
			common: {
				name: "treeData",
				type: "json",
				role: "indicator",
				read: true,
				write: true,
			},
			native: {},
		});
	}



}


module.exports = {
	treeBuilder
}