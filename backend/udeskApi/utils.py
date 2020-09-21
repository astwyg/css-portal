import requests, hashlib, time, uuid, json
from urllib.parse import urlencode, quote_plus
from backend.configEnv import UDESK

api_token = None


def postApiRaw(url, data=dict()): # you should use postApi instead of this method.
    r = requests.post(UDESK["entry"]+url, json=data)
    assert r.status_code == 200
    return r.json()


def getApiToken():
    global api_token
    if not api_token:
        r = postApiRaw("open_api_v1/log_in",{
            "email":UDESK["admin_email"],
            "password":UDESK["admin_passwd"],
        })
        assert r.get("code") == 1000
        api_token = r.get("open_api_auth_token")
    return api_token


def getSign():
    global api_token
    timestamp = int(time.time())
    nonce = uuid.uuid1()
    sign_version = "v2"
    sha256 = hashlib.sha256()
    sha256.update(
        "{}&{}&{}&{}&{}".format(  # see https://www.udesk.cn/doc/apiv2/intro/#_7
            UDESK["admin_email"],
            getApiToken(),
            timestamp,
            nonce,
            sign_version
        ).encode('utf-8')
    )
    return {
        "email":UDESK["admin_email"],
        "sign":sha256.hexdigest(),
        "nonce":nonce,
        "sign_version":sign_version,
        "timestamp":timestamp
    }


def getApi(url, params=dict()):
    params = dict(params, **getSign())
    r = requests.get(UDESK["entry"]+url, params=params)
    assert r.status_code == 200
    return r.json()


def postApi(url, data=dict()):
    url = url + "?" + urlencode(getSign(), quote_via=quote_plus)
    return postApiRaw(url, data)


def putApi(url, params=dict(), data=dict()):
    params = urlencode(dict(params, **getSign()), quote_via=quote_plus)
    url = UDESK["entry"] + url + '?' + params
    r = requests.put(url, json=data)
    assert str(r.status_code).startswith("2")
    return r.json()


def postApiV1(url, data=dict(), params=dict()):
    md5 = hashlib.md5()
    query = urlencode(params, quote_via=quote_plus)
    if query:
        md5.update((query + "&" + UDESK["secret"]).encode('utf-8'))
        sign = md5.hexdigest()
        url = UDESK["entry"] + url + "?" + query + "&sign=" + sign
    else:
        md5.update((UDESK["secret"]).encode('utf-8'))
        sign = md5.hexdigest()
        url = UDESK["entry"] + url + "?sign=" + sign
    r = requests.post(url, json=data)
    assert str(r.status_code).startswith("2")
    return r.json()


def webImSignature(phone):
    timestamp = int(time.time())*1000
    nonce = uuid.uuid1()
    nonce = str(nonce).replace("-","")
    sha1 = hashlib.sha1()
    sha1.update("nonce={}&timestamp={}&web_token={}&{}".format( # see http://www.udesk.cn/doc/thirdparty/webim/#-_4
        nonce,
        timestamp,
        phone,
        UDESK["web_im_key"]
    ).encode('utf-8'))
    signature = sha1.hexdigest().upper()
    return "c_phone={}&nonce={}&signature={}&timestamp={}&web_token={}&{}".format(
        phone,
        nonce,
        signature,
        timestamp,
        phone,
        UDESK["web_im_key"]
    )


if __name__ == "__main__":
    # r = postApi("open_api_v1/customers",{
    #     "customer":{
    #         "email":"mail2@ft.com",
    #         "nick_name":"王永刚1",
    #         "cellphones":[
    #             [None,17710432236]
    #         ],
    #         "description": json.dumps({
    #             "公司":"飞腾",
    #             "职务":"xx"
    #         })
    #     }
    # })
    # print(r)

    # r = postApiV1("api/v1/tickets/get.json", {
    #     "email":"mail@ft.com",
    # })
    # print(r)

    # r = postApi("open_api_v1/knowledge_catalogs",{
    #         "knowledge_catalog": {
    #             "knowledge_type_name": "question",
    #             "name": "门户公开内容",
    #             "agent_id":0,
    #             "parent_id": ""
    #     }
    # })
    # print(r) # id=36901

    ## 查询知识库
    # r = getApi("open_api_v1/knowledge_questions", {
    #     "catalog_id":36901,
    #     "agent_id":0
    # })
    # print(r)

    # ## 查询用户
    # r = getApi("open_api_v1/customers/get_customer", {
    #     "type":"cellphone",
    #     "content": "17710432234"
    # })
    # # r = putApi("open_api_v1/customers/update_customer", params={
    # #     "type": "cellphone",
    # #     "content": "17710432234"
    # # }, data={
    # #     "customer": {
    # #         "nick_name":"王永刚_改",
    # #     }
    # # })
    # print(r)

    sign = webImSignature(17710432234)
    print("https://phytium.s2.udesk.cn/im_client/?web_plugin_id=28724&channel=项目咨询&"+sign)
