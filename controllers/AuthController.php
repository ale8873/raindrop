<?php

namespace app\controllers;

use webvimark\components\BaseController;
use webvimark\modules\UserManagement\components\UserAuthEvent;
use webvimark\modules\UserManagement\models\forms\ChangeOwnPasswordForm;
use webvimark\modules\UserManagement\models\forms\ConfirmEmailForm;
use webvimark\modules\UserManagement\models\forms\LoginForm;
use webvimark\modules\UserManagement\models\forms\PasswordRecoveryForm;
use webvimark\modules\UserManagement\models\User;
use webvimark\modules\UserManagement\UserManagementModule;
use Yii;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;
use yii\widgets\ActiveForm;

class AuthController extends BaseController
{
    /**
     * @var array
     */
    public $freeAccessActions = ['login'];
  
    
    /**
     * Login form
     */
    public function actionLogin()
    {     
        $model = new LoginForm();   
        if ($model->load(Yii::$app->request->post()) AND $model->login() ){
            $user_id = Yii::$app->user->id;
            return $this->redirect(['/profiles','filter[user_id]'=>$user_id]);
        }
        header('HTTP/1.0 403 Forbidden');
        exit;        
    }

    /**
     * Get current user profile
     */
    public function actionProfile()
    {    
       return $this->redirect(array('/profiles','filter[user_id]'=>Yii::$app->user->id));
    }
    
    /**
     * Logout
     */
    public function actionLogout()
    {
       Yii::$app->user->logout();
    }
}