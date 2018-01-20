function orderConfig($stateProvider){
	$stateProvider.state('order', {
        abstract: true,
        url: "/order",
        templateUrl: "views/common/content.html",
        controller: 'orderCtrl'
    })
    .state('order.grid', {
        url: "/grid",
        templateUrl: "views/order/grid.html",
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
        controller:'orderGridCtrl'
    })
    .state('order.create', {
        url: "/create",
        templateUrl: "views/order/create.html",
        data: { pageTitle: 'Basic form' },
        controller: 'orderCreateCtrl',
    })
    .state('order.update', {
        url: "/update?id",
        templateUrl: "views/order/update.html",
        data: { pageTitle: 'Basic form' },
        controller: 'orderUpdateCtrl',
    })
    .state('order.view', {
        url: "/view?id",
        templateUrl: "views/order/view.html",
        data: { pageTitle: 'Basic form' },
        controller: 'orderViewCtrl',
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