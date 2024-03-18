function layer_init(){
	for(i=1;i<=this.layer.width;i++){
		for(j=1;j<=this.layer.height;j++){
			_node[j] = {
				x: i,
				y: j,
				is_block: 0,
				txt: i + ',' + j
			};
			this.arr_node_layer[i].push(_node);
		}
	}
}

function block_init(){
	
}








