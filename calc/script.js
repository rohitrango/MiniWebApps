var jq = jQuery.noConflict();
var app = angular.module('calc', []);

function performOperation(stack,op) {

	if(stack.length>1) {
		for(var i=0;i<stack.length;i++) {
			if(stack[i]==op) {
				switch(op) {
					case '+': stack[i] = stack[i-1] + stack[i+1]; 
							  stack[i+1] = null;
							  stack[i-1] = null;
							  i--;
							  break;
					case '-': stack[i] = stack[i-1] - stack[i+1]; 
							  stack[i+1] = null;
							  stack[i-1] = null;
							  i--;
							  break;
					case '*': stack[i] = stack[i-1] * stack[i+1]; 
							  stack[i+1] = null;
							  stack[i-1] = null;
							  i--;
							  break;
					case '/': stack[i] = stack[i-1] / stack[i+1]; 
							  stack[i+1] = null;
							  stack[i-1] = null;
							  i--;
							  break;

					case '%': stack[i] = stack[i-1] % stack[i+1]; 
							  stack[i+1] = null;
							  stack[i-1] = null;
							  i--;
							  break;
				}
			stack = stack.filter(function(val){
				return Boolean(val);
			});
			}				
		}	
	}
	else {
		return stack;
	}

	stack = stack.filter(function(val){
		return Boolean(val);
	});
	console.log(stack);
	return stack;
}

app.controller('Calculator', ['$scope', function($scope){
	
	$scope.expr = "0";

	$scope.evaluate = function(){
		var stack = [],opPos = [];

		if($scope.expr=="") {
			$scope.expr = "0";
			return;
		}
		else{
			//first check invalid input
			if($scope.invalidInput()) {
				$scope.expr = "Invalid input";
			}
			else {
				for(var i=0;i<$scope.expr.length;i++) {
					var s = $scope.expr[i];
					if($scope.isOperator(s))
						opPos.push(i);
				}	//pushing all the operator positions
				opPos.push($scope.expr.length);
				opPos.unshift(-1);

				for(var x=0;x<opPos.length-1;x++) {
					stack.push( Number($scope.expr.substring(opPos[x]+1,opPos[x+1])) );
					stack.push($scope.expr[opPos[x+1]]);
				}
				stack.pop();		//removing the last undefined expression
				console.log(stack);
				
				stack = performOperation(stack,'/');
				stack = performOperation(stack,'%');
				stack = performOperation(stack,'*');
				stack = performOperation(stack,'+');
				stack = performOperation(stack,'-');
				stack = stack.filter(function(val){
					return Boolean(val);
				});
				$scope.expr = stack[0];
			}	//evaluate the expr
		}
	};

	$scope.isOperator = function(s){
		if(s=='+' || s=='-' || s=='/' ||s=='*' || s=='%')
			return true;
		return false;
	};

	$scope.invalidInput = function(){
		for(var i=0;i<$scope.expr.length-1;i++)
			if($scope.isOperator(($scope.expr[i])) && ($scope.isOperator($scope.expr[i+1])))
				return true;
		for(var j=0;j<$scope.expr.length-1;j++) 
			if(($scope.expr[i]=='/' || $scope.expr[i]=='%')&&$scope.expr[i+1]=='0')
				return true;
		return false;
	};

	$scope.addTerm = function(event){
		var temp = event.target.id;
		switch(temp) {
			case 'AC':  $scope.expr = ""; 
					    break;
			case 'CE':  if($scope.expr.length && $scope.expr!=='Invalid input' && $scope.expr!='0')
							$scope.expr = $scope.expr.substring(0,$scope.expr.length-1);
						else if($scope.expr == 'Invalid input')
						{
							$scope.expr = ""; 
						}
						break;
			case 'Ans': $scope.expr += (String($scope.res));
						break;
			case '=': 	$scope.evaluate();
						break;
			default: 	$scope.expr += String(temp);
						break;
		}
	};
}]);