<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\base\Model;

class ModelInfoController extends Controller
{
    public function actionColumns($model){
        $model = "app\models\\".ucwords($model);
        $model = new $model();
        $labels = $model->attributeLabels();
        header('Content-Type: application/json');
        echo json_encode($labels);
    }
}