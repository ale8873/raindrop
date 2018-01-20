<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "order".
 *
 * @property integer $id
 * @property string $cart
 * @property integer $wheels
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property string $address
 * @property string $city
 * @property string $province
 * @property string $vat
 * @property string $total
 * @property string $time
 */
class Order extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'order';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['cart'], 'string'],
            [['wheels'], 'integer'],
            [['total'], 'number'],
            [['time'], 'safe'],
            [['name', 'email', 'phone', 'address', 'city', 'province', 'vat'], 'string', 'max' => 45],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'cart' => 'Cart',
            'wheels' => 'Domicilio',
            'name' => 'Name',
            'email' => 'Email',
            'phone' => 'Phone',
            'address' => 'Address',
            'city' => 'City',
            'province' => 'Province',
            'vat' => 'Vat',
            'total' => 'Total',
            'time' => 'Orario',
        ];
    }
}
