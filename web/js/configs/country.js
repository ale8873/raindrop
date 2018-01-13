function countryConfig($stateProvider){
	$stateProvider.state('country', {
        abstract: true,
        url: "/country",
        templateUrl: "views/common/content.html",
        controller: 'countryCtrl'
    })
    .state('country.grid', {
        url: "/grid",
        templateUrl: "views/country/grid.html",
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
        controller:'countryGridCtrl'
    })
    .state('country.create', {
        url: "/create",
        templateUrl: "views/country/create.html",
        data: { pageTitle: 'Basic form' },
        controller: 'countryCreateCtrl',
    })
    .state('country.update', {
        url: "/update?id",
        templateUrl: "views/country/update.html",
        data: { pageTitle: 'Basic form' },
        controller: 'countryUpdateCtrl',
    })
    .state('country.view', {
        url: "/view?id",
        templateUrl: "views/country/view.html",
        data: { pageTitle: 'Basic form' },
        controller: 'countryViewCtrl',
    })
}