<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "supplier".
 *
 * @property integer $id
 * @property string $name
 * @property integer $vat
 * @property string $country
 * @property string $phone
 * @property string $mobile
 */
class Supplier extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'supplier';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['vat'], 'integer'],
            [['name', 'phone', 'mobile'], 'string', 'max' => 45],
            [['country'], 'string', 'max' => 2],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'vat' => 'Vat',
            'country' => 'Country',
            'phone' => 'Phone',
            'mobile' => 'Mobile',
        ];
    }
}
