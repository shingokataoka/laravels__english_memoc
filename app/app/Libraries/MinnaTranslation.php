<?php

namespace App\Libraries;

use GuzzleHttp\Client;





class MinnaTranslation
{


    // 訳して返す共通処理。
    private static function fetchToTranslation(
        // https://${ドメイン}/api/mt/generalNT_ja_en/ の場合は、"generalNT_ja_en"を入れる。
        $api_param,
        // 訳したい文章。
        $text,
    )
    {
        // 基底URL (https://${ドメイン}までを入力)
        $apiUrl = config('env.minna_translation_url');
        // API key
        $apiKey = config('env.minna_translation_key');
        // API secret
        $apiSecret = config('env.minna_translation_secret');
        // ログインID
        $apiUserName = config('env.minna_translation_user_name');

        $api_name  = 'mt';  // API名 (https://${ドメイン}/api/mt/generalNT_ja_en/ の場合は、"mt")


        $provider = new \League\OAuth2\Client\Provider\GenericProvider(
            [
                'clientId'                => $apiKey,                            // API Key
                'clientSecret'            => $apiSecret,                         // API secret
                'redirectUri'             => '',                             // リダイレクトURI（不要）
                'urlAuthorize'            => '',                             // 認可コード取得URI（不要）
                'urlAccessToken'          => $apiUrl . '/oauth2/token.php',      // アクセストークン取得URI
                'urlResourceOwnerDetails' => '',
            ],
        );

        try {

            // Try to get an access token using the authorization code grant.
            $accessToken = $provider->getAccessToken('client_credentials');

            // The provider provides a way to get an authenticated API request for
            // the service, using the access token; it returns an object conforming
            // to Psr\Http\Message\RequestInterface.

            $params = array(
                'access_token' => $accessToken->getToken(),  // アクセストークン
                'key'          => $apiKey,                       // API Key
                'api_name'     => $api_name,
                'api_param'    => $api_param,
                'name'         => $apiUserName,                      // ログインID
                'type'         => 'json',                     // レスポンスタイプ
                // 'xxx'          => 'xxx',                     // 以下、APIごとのパラメータ
                'text'          => $text,                     // 以下、APIごとのパラメータ
            );

            $request = $provider->getAuthenticatedRequest(
                'POST',
                $apiUrl . '/api/?' . http_build_query($params),                    // URL + URLパラメータ
                $accessToken,
            );

            $response = $provider->getResponse($request);
            $data = $response->getBody()->getContents();
            $data = json_decode($data);

            return $data->resultset->result->text;

        } catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {

            // Failed to get the access token or user details.
            exit($e->getMessage());

        }

    }





    // 英文を和訳して返す。
    public static function FetchEnglishToJapanese($englishText)
    {
        // 訳して返す共通処理。
        $JapaneseText = self::fetchToTranslation(
            // https://${ドメイン}/api/mt/generalNT_ja_en/ の場合は、"generalNT_ja_en"を入れる。
            $url_param = 'generalNT_en_ja',
            // 訳したい文章。
            $text = $englishText,
        );

        return $JapaneseText;

    }




    // 和文を英訳して返す。
    public static function fetchJapaneseToEnglish($japaneseText)
    {
        $englishText = self::fetchToTranslation(
            // https://${ドメイン}/api/mt/generalNT_ja_en/ の場合は、"generalNT_ja_en"を入れる。
            $url_param = 'generalNT_ja_en',
            // 訳したい文章。
            $text = $japaneseText,
        );
        return $englishText;
    }



}
