<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "country".
 *
 * @property integer $id
 * @property string $code
 * @property string $name
 * @property string $prefix
 * @property integer $vat
 */
class Country extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'country';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['code', 'name', 'prefix'], 'required'],
            [['vat'], 'integer'],
            [['code'], 'string', 'max' => 2],
            [['name'], 'string', 'max' => 45],
            [['prefix'], 'string', 'max' => 10],
            [['name'], 'unique'],
            [['code'], 'unique'],
            [['prefix'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'Id',
            'code' => 'Codice',
            'name' => 'Nome',
            'prefix' => 'Prefisso Telefonico',
            'vat' => 'Aliquota Iva',
        ];
    }
}
