function supplierConfig($stateProvider){
	$stateProvider.state('supplier', {
            abstract: true,
            url: "/supplier",
            templateUrl: "views/common/content.html",
            controller: 'supplierCtrl'
        })
        .state('supplier.grid', {
            url: "/grid",
            templateUrl: "views/supplier/grid.html",
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
            controller:'supplierGridCtrl'
        })
        .state('supplier.create', {
            url: "/create",
            templateUrl: "views/supplier/create.html",
            data: { pageTitle: 'Basic form' },
            controller: 'supplierCreateCtrl',
        })
        .state('supplier.update', {
            url: "/update?id",
            templateUrl: "views/supplier/update.html",
            data: { pageTitle: 'Basic form' },
            controller: 'supplierUpdateCtrl',
        })
        .state('supplier.view', {
            url: "/view?id",
            templateUrl: "views/supplier/view.html",
            data: { pageTitle: 'Basic form' },
            controller: 'supplierViewCtrl',
        })
}