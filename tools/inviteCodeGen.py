import configparser, requests, json, os


def run():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    cf = configparser.ConfigParser()
    cf.read(os.path.join(BASE_DIR, "inviteCodeGen.ini"), encoding='utf-8')
    host = cf.get("server","host")
    print("欢迎使用邀请码生成器")
    print("-"*10)
    number = 0
    while number>200 or number<5:
        number = input("请输入数量(5-200)\n")
        number = int(number)
    company = input("请输入公司名称\n")
    secret = input("请输入邀请码生成口令, 如果不知道, 请咨询联盟秘书处\n")
    if number and company and secret:
        print("请等待服务器返回结果...")
        r = requests.post(host+"inviteCode/batchCreate/", json={
            "company":company,
            "number": number,
            "secret": secret
        })
        assert r.status_code == 200
        data = r.json()
        if data.get("status"):
            print("生成失败, 服务器返回:{}".format(data.get("message")))
        else:
            print("成功, 正在生成本地文件'邀请码-{}.txt'".format(company))
            with open(os.path.join(BASE_DIR, "邀请码-{}.txt".format(company)), "wt") as f:
                f.write("邀请码-{} \n".format(company))
                f.write(cf.get("txt","welcome"))
                f.write("\n" + "-"*10 + "\n")
                codes = data.get("codes")
                i = 1
                for code in codes:
                    if i%4:
                        i += 1
                        f.write(code+"\t\t")
                    else:
                        i=1
                        f.write(code+"\n")
                print("文件'邀请码-{}.txt'生成完毕".format(company))
                input("按任意键退出")


if __name__ == "__main__":
    run()