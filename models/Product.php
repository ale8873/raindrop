<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "product".
 *
 * @property integer $id
 * @property string $sku
 * @property string $ean
 * @property string $title
 * @property string $price
 * @property string $description
 * @property string $image
 * @property string $category
 */
class Product extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'product';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['title'], 'required'],
            [['price'], 'number'],
            [['sku'], 'string', 'max' => 45],
            [['ean'], 'string', 'max' => 13],
            [['title', 'description', 'image'], 'string', 'max' => 512],
            [['category'], 'string', 'max' => 255],
            [['ean'], 'unique'],
            [['sku'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'sku' => 'Codice',
            'ean' => 'EAN',
            'title' => 'Titolo',
            'price' => 'Prezzo',
            'description' => 'Descrizione',
            'image' => 'Immagine',
            'category' => 'Categoria',
        ];
    }
}
