<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "supplier".
 *
 * @property integer $id
 * @property string $name
 * @property string $vat
 * @property string $country_code
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
            [['name', 'vat', 'country_code'], 'required'],
            [['name'], 'string', 'max' => 45],
            [['vat'], 'string', 'max' => 11],
            [['country_code'], 'string', 'max' => 2],
            [['phone', 'mobile'], 'string', 'max' => 20],
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
            'country_code' => 'Country Code',
            'phone' => 'Phone',
            'mobile' => 'Mobile',
        ];
    }
}
