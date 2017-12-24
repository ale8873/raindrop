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
 * @property string $fax
 * @property string $note
 * @property string $tax_code
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
            [['name'], 'required'],
            [['note'], 'string'],
            [['name'], 'string', 'max' => 45],
            [['vat'], 'string', 'max' => 11],
            [['country_code'], 'string', 'max' => 2],
            [['phone', 'mobile', 'fax'], 'string', 'max' => 20],
            [['tax_code'], 'string', 'max' => 16],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'Codice',
            'name' => 'Denominazione',
            'vat' => 'Partita Iva',
            'country_code' => 'Codice Paese',
            'phone' => 'Telefono',
            'mobile' => 'Cellulare',
            'fax' => 'Fax',
            'note' => 'Note',
            'tax_code' => 'Codice Fiscale',
        ];
    }
}
