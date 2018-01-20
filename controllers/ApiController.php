<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\base\Model;
use app\models\Keepa;

class ApiController extends Controller
{
    public function actionInfoByEan($ean){
        header('Content-Type: application/json');
        if(!$keepa = Keepa::find()->where(['ean' => $ean])->one()){
            $results = file_get_contents("https://api.keepa.com/product?key=<<&domain=8&code=$ean");
            echo $results;
            $keepa = new Keepa();
            $keepa->ean = $ean;
            $keepa->data = $results;
            //$keepa->save();            
        }
        else{
            echo $keepa->data;
        }
    }
}