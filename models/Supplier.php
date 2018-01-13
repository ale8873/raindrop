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
 * @property string $email
 * @property string $pec
 * @property string $address
 * @property string $cap
 * @property string $city
 * @property string $province
 * @property string $referent
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
            [['name', 'email', 'pec', 'city', 'province', 'referent'], 'string', 'max' => 45],
            [['vat'], 'string', 'max' => 11],
            [['country_code'], 'string', 'max' => 2],
            [['phone', 'mobile', 'fax'], 'string', 'max' => 20],
            [['tax_code'], 'string', 'max' => 16],
            [['address'], 'string', 'max' => 255],
            [['cap'], 'string', 'max' => 5],
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
            'email' => 'Email',
            'pec' => 'Pec',
            'address' => 'Indirizzo',
            'cap' => 'Cap',
            'city' => 'Comune',
            'province' => 'Provincia',
            'referent' => 'Referente',
        ];
    }
}
