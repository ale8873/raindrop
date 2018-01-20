function productConfig($stateProvider){
	$stateProvider.state('product', {
        abstract: true,
        url: "/product",
        templateUrl: "views/common/content.html",
        controller: 'productCtrl'
    })
    .state('product.grid', {
        url: "/grid",
        templateUrl: "views/product/grid.html",
        data: { pageTitle: 'Data Tables' },
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        serie: true,
                        files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                    },
                    {
                        serie: true,
                        name: 'datatables',
                        files: ['js/plugins/dataTables/angular-datatables.min.js']
                    },
                    {
                        serie: true,
                        name: 'datatables.buttons',
                        files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                    },
                    {
                        files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                    }
                ]);
            }
        },
        controller:'productGridCtrl'
    })
    .state('product.create', {
        url: "/create",
        templateUrl: "views/product/create.html",
        data: { pageTitle: 'Basic form' },
        controller: 'productCreateCtrl',
    })
    .state('product.update', {
        url: "/update?id",
        templateUrl: "views/product/update.html",
        data: { pageTitle: 'Basic form' },
        controller: 'productUpdateCtrl',
    })
    .state('product.view', {
        url: "/view?id",
        templateUrl: "views/product/view.html",
        data: { pageTitle: 'Basic form' },
        controller: 'productViewCtrl',
    })
    .state('product.cart', {
        url: "/cart",
        templateUrl: "views/product/cart.html",
        data: { pageTitle: 'Basic form' },
        controller: 'productCartCtrl',
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                    }
                ]);
            }
        },
    })
}