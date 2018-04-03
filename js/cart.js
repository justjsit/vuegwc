var vm = new Vue({
	el: "#app",
	data: function() {
		return {
			productList: [],
			checkAllFlag:false,
			delFlag:false,
			currentItemId:0,
			allMoney:0
		}
	},
	created: function() {
		this.getProductList();
	},
	methods: {
		getProductList: function() {
			_this = this;
			$.ajax({
				type: "GET",
				url: "data/cartData.json",
				dataType: "json",
				success: function(data) {
					_this.productList = data.result.list;
				}
			})
		},
		caculateMoney: function(item, val) {
			if(val < 0) {
				item.productQuantity--;
				if(item.productQuantity < 1) {
					item.productQuantity = 1;
				}
			} else {
				item.productQuantity++;
			}
		this.calAllMoney();
		},
		toggleCheckFlag:function(item){
			if(typeof item.checkFlag == 'undefined'){
				vm.$set(item,'checkFlag',true);
			}else{
				item.checkFlag=!item.checkFlag;
			}
			this.calAllMoney();
			
		},
		toggleCheckAllFlag:function(flag){
			if(flag==1){
				this.checkAllFlag=true;
				this.productList.forEach(function(item,index){
					if(typeof item.checkFlag == 'undefined'){
						vm.$set(item,'checkFlag',true);
					}else{
						item.checkFlag=true;
					}
				})
			}else{
				this.checkAllFlag=false;
				this.productList.forEach(function(item,index){
					if(typeof item.checkFlag == 'undefined'){
						vm.$set(item,'checkFlag',false);
					}else{
						item.checkFlag=false;
					}
				})
			}
			this.calAllMoney();
			
		},
		delProduct:function(item){
			this.delFlag=!this.delFlag;
				this.currentItemId=item.productId;
		},
		affirmDel:function(){
			var _this=this;
			this.delFlag=!this.delFlag;
			this.productList=this.productList.filter(function(item,index){
				return item.productId!=_this.currentItemId;
			})
		},
		calAllMoney:function(){
			var _this=this;
			this.allMoney=0;
			this.productList.forEach(function(item,index){
				if(item.checkFlag){
					return _this.allMoney+=item.productQuantity*item.productPrice;
				}
			})
		}
	},
	filters:{
		formateMoney:function(val,type){
			return "￥"+val.toFixed(2)+type;
		}
	}
})