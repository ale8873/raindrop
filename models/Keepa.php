<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "keepa".
 *
 * @property integer $id
 * @property string $ean
 * @property string $data
 */
class Keepa extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'keepa';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['data'], 'string'],
            [['ean'], 'string', 'max' => 13],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'ean' => 'Ean',
            'data' => 'Data',
        ];
    }
}
