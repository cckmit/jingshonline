<template>
  <div style="width:1380px;min-width:1380px;margin:auto;min-height:1000px;margin-top:30px">
    <el-row class="case-id caseInfoClass">
      <el-breadcrumb separator-class="el-icon-minus" class="breadcrumb title">
        <el-breadcrumb-item :to="{path:'/'}" >首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/case'}" >查找案例</el-breadcrumb-item>
        <el-breadcrumb-item >案例详情</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 左边 -->
      <el-col v-bind="caseInfoData" class="case-content case-border">
        <!-- 概要信息 -->
        <div class="case-content-title">
          <span class="case-title"><i class="titleIcon"/> 概要信息</span>
          <p style="float:right">更新时间：<span class="case-font-hover"> {{ caseInfoData.updateTime }}</span></p>
        </div>
        <!-- 案件信息 -->
        <div class="case-content-desc">
          <el-row>
            <el-form ref="form" label-width="100px">
              <el-col :span="11">
                <el-form-item label="主办律师:"><p> {{ caseInfoData.client }}</p></el-form-item>
                <el-form-item label="审判机关:"><p> {{ caseInfoData.administrativeOrgan }}</p></el-form-item>
                <el-form-item label="文书号码:"><p> {{ caseInfoData.judgmentNumber }}</p></el-form-item>
                <el-form-item label="浏览次数:"><p class="case-font-hover"> {{ caseInfoData.clickCount }}</p></el-form-item>
              </el-col>
              <el-col :span="13">
                <el-form-item label="判决时间:"><p>{{ caseInfoData.endTime }}</p></el-form-item>
                <el-form-item label="涉案案由:"><p>{{ caseInfoData.caseReasonName }}</p></el-form-item>
                <el-form-item label="所属领域:"><p>{{ caseInfoData.practiceAreaName }}</p></el-form-item>
                <el-form-item label="所属行业:"><p>{{ caseInfoData.industryName }}</p></el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
        <!-- 其他信息 -->
        <div class="case-content-main">
          <el-form ref="form" label-width="0">
            <el-form-item>
              <p class="case-title"><i class="titleIcon"/> 当事人信息</p>
              <p>
                原告毕某某，男，汉族，42岁。
                原告张某甲，男，汉族，49岁。
                原告张某乙，男，汉族，45岁。
                三原告委托代理人谢鹏辉、朱晓彬，北京市京师律师事务所律师。
                被告：漯河市环境保护局，住所地：漯河市源汇区嵩山路601号。
                法定代表人刘京安，局长。
                委托代理人郭剑锋，漯河市经济区后谢乡法律服务所法律工作者。
                第三人漯河华泰置业集团有限公司。
                法定代表人邢俊生，总经理。
                委托代理人梁某某，男，30岁。
                第三人河南蓝森环保科技有限公司，住所地：郑州市农业路38号楼1801号。
                法定代表人孙东红，董事长。
                委托代理人钟某某，男，汉族，58岁。
                委托代理人薛某某，男，汉族，47岁。
              </p>
            </el-form-item>
            <el-form-item>
              <p class="case-title"><i class="titleIcon"/>审理经过</p>
              <p>
                审理经过
                原告毕某某、张某甲、张某乙不服被告漯河市环境保护局（以下简称市环保局）作出的环境管理行政审批具体行政行为一案，于2015年2月16日向本院提起行政诉讼。因漯河华泰置业集团有限公司（以下简称漯河华泰公司）、河南蓝森环保科技有限公司（以下简称河南蓝森公司）与被诉具体行政行为有法律上的利害关系，根据《中华人民共和国行政诉讼法》第二十九条之规定，本院依法通知上述两单位作为本案第三人参加诉讼。本院依法组成合议庭，公开开庭进行了审理。原告毕某某、张某甲、张某乙及其委托代理人谢鹏辉、朱晓彬，被告市环保局的委托代理人郭剑锋，第三人漯河华泰公司的委托代理人梁某某，第三人河南蓝森公司的委托代理人钟某某、薛某某到庭参加诉讼。本案现已审理终结。
                2013年7月15日被告市环保局作出漯环监审（2013）16号关于《漯河华泰置业集团有限公司新建华泰龙庭首府项目环境影响报告书》的审批意见（以下简称《审批意见》），同意该项目按照报告书所列项目的性质、规模、地点、环境保护对策措施进行建设。
                被告市环保局在法定期限内本院提供了作出被诉具体行政行为的证据、依据：
                临颍县环保局出具的漯河华泰置业公司华泰龙庭首府项目初审意见，证明该项目建设符合临颍县拟批驻建设项目环境管理要求（详见附件九）。
                二、临颍县环保局出具的环境影响评价执行标准，规定了该项目建设所在区域环境质量标准和污染物排放标准要求（附件八）。
                三、漯河市环保局核定的污染物总量控制指标，确定了该项目污染物排放总量控制范围（附件十二）。
                四、漯河市环保局组织相关专家进行审查，最终由专家组形成的专家技术审查意见——确定各项指标总体可信（附件十一）。
                五、漯河市环境监测中心站、临颍县环境监测站提供的现状监测资料反映了该建设项目所在区域现状环境质量状况（建设单位在报批材料中已作了相关、必要描述）。
                六、公众参与情况资料：相关单位在该项目所在区域现场张贴公告、召开公众座谈会、网上发布信息、发布问卷调查材料等多种形式征询群众意见（附件五、六）。证明该项目审批前被告方在漯河市环保局官方网站进行了拟批准公示，审批后在官方网站上也进行了公示，表明被告此项行政审批行为程序合法。
                七、三原告诉临颍县住建局拆迁行为违法案件的相关法律文书。证明本案存在一案多诉或重复诉讼的情形。
              </p>
            </el-form-item>
            <el-form-item>
              <p class="case-title"><i class="titleIcon"/>原告诉称</p>
              <p>
                原告毕某某、张某甲、张某乙诉称，被告市环保局作出的关于《漯河华泰置业集团有限公司新建华泰龙庭首府项目环境影响报告书》的审批意见，占用原告合法的鸡舍及承包地进行安置房建设，与原告具有法律上的利害关系，依法提起诉讼。原告认为，该具体行政行为属于行政许可，被告市环保局作出该具体行政行为程序违法，应予撤销。根据《中华人民共和国环境影响评价法》第二十一条规定：“除国家规定需要保密的情形外，对环境可能造成重大影响、应当编制环境影响报告书的建设项目，建设单位应当在报批建设项目环境影响报告书前，举行论证会、听证会，或者采取其他形式，征求有关单位、专家和公众的意见。建设单位报批的环境影响报告书应当附具对有关单位、专家和公众的意见采纳或者不采纳的说明。”、《建设项目环境保护管理条例》第十五条规定：“建设单位编制环境影响报告书，应当依照有关法律规定，征求建设项目所在地有关单位和居民的意见。”、国家环境保护总局关于印发《环境影响评价公众参与暂行办法》的通知（环发（2006）28号）第五条、第七条、第十三条规定及《行政许可法》第三十六条、第四十七条第一款的规定，该具体行政行为属于行政许可，而被告在作出该具体行政行为时没有通过适当方式告知包括原告在内的利害关系人，因此，剥夺了原告的陈述、申辩及听证的权利，程序违法。综上，被告作出的该具体行政行为违法、错误，严重侵害了原告的合法权益。请求撤销被告2013年7月15日作出的关于《漯河华泰置业集团有限公司新建华泰龙庭首府项目环境影响报告书》的审批意见；诉讼费用由被告承担。
                原告毕某某、张某甲、张某乙向本院提供以下证据材料：
                1、四份租赁协议复印件，证明三原告享有土地的合法使用权，有原告主体资格。
                2、身份证、户口本复印件，证明与租赁协议一致。
                3、环境影响报告书的审批意见，证明三原告承包土地在报告书内，与三原告有利害关系。
              </p>
            </el-form-item>
            <el-form-item>
              <p class="case-title"><i class="titleIcon"/> 被告辩称 </p>
              <p>
                被告辩称
                被告市环保局辩称，一、被告市环保局2013年7月15日作出的《关于﹤漯河华泰置业集团有限公司新建华泰龙庭首府项目环境影响报告书﹥的审批意见》【漯环监审（2013）16号】的行政行为，审批材料齐备、认定事实清楚、适用法律正确，符合审批条件。二、依据《河南省人民政府令第（133）号》，被告市环保局完全有权作出上述行政审批。被告市环保局作出的上述行政行为符合法定程序。被告市环保局在作出上述行政行为过程中，相关单位依法依规通过现场张贴公告、网上信息发布、召开公众座谈会及发布问卷调查材料等多种形式多方征询群众意见。三、毕某某、张某甲、张某乙不是本案适格的原告。被告的行政审批行为和三原告的所谓“合法权益”之间没有法律上的因果关系，三原告不是涉案区域内的居民，更不是被告方行政审批对象的利害关系人。综上所述，被告市环保局认为：作出的上述行政行为实体完备、程序合法，依法应予维持。依法应予驳回三原告的诉讼请求。
                第三人漯河华泰公司、河南蓝森公司的陈述意见与被告市环保局的答辩意见相同。
                第三人漯河华泰公司、河南蓝森公司没有提供证据。
                原告毕某某、张某甲、张某乙对被告市环保局提供证据的质证意见：对预审意见被告市环保局应说明法律依据。对执行标准被告不能依此证明该建设项目符合有关环境要求。关于备案表不能作为被告证明的依据。证据四、五真实性有异议，没有公章，不能证明被告的证明目的。对证据六是法定必经程序不能证明被告履行《环境影响评价公众参与暂行办法》第十三条的规定。
                第三人漯河华泰公司、河南蓝森公司对被告市环保局提供的证据没有意见。
                被告市环保局对原告毕某某、张某甲、张某乙提供的身份证、户口本复印件，及环境影响报告书的审批意见无异议，认为原告提供的租赁协议的真实性无法证实。
                第三人漯河华泰公司、河南蓝森公司质证意见与被告市环保局相同。
              </p>
            </el-form-item>
            <el-form-item>
              <p class="case-title"><i class="titleIcon"/> 本院查明</p>
              <p>
                经审理查明，2000年9月20日和2003年10月12日原告张某甲、张某乙的父亲张卷立与同村村民签订二份土地租赁协议，后该租赁土地由原告张某甲、张某乙作为养鸡场一直实际使用，原告毕某某与同村村民签订一份土地租赁协议亦作为养鸡场一直实际使用。原告毕某某、张某甲、张某乙的养鸡场位于漯河华泰置业集团有限公司新建华泰龙庭首府项目范围内，2014年10月三原告的养鸡场被临颍县住房和城乡规划局以违法建设为由已被拆除。2013年3月3日第三人漯河华泰公司委托第三人蓝森环公司对第三人漯河华泰公司新建华泰龙庭首府项目进行环境影响评价工作，提供的材料有：1、委托书；2、由临颍县国土资源局于2013年4月15日出具的项目用地性质证明及临颍县政府颁发的土地证复印件；3、由临颍县建设局于2013年5月29日出具的规划意见；4、临颍县城乡规划委员会文件（临规纪（2011）2号）。第三人漯河华泰公司于2013年3月5日-19日和同年5月3日-17日在漯河市临颍县环境保护局工程建设领域项目公开共享专栏上二次发布公示该项目环境影响评价信息。2013年5月6日在华泰龙庭首府项目所在地进行了现场公示，2013年5月16日上午在漯河华泰公司会议室召开了该项目公众参与座谈会，随后又进行了问卷调查，通过专家技术评审、该项目报告书编制完成后环评结论为漯河华泰公司华泰龙庭首府项目符合国家产业政策，位置可行，项目设计先进、布局合理，绿化方案和建设位置可行等。临颍县环保局于2013年7月9日对《漯河华泰置业集团有限公司新建华泰龙庭首府项目环境影响报告书》出日被告市环保局对该项目环境影响报告书作出漯环监审具了预审意见后，上报被告市环保局审批，2013年7月15（2013）16号关于《漯河华泰置业集团有限公司新建华泰龙庭首府项目环境影响报告书》的审批意见，同意该项目按照报告书所列项目的性质、规模、地点、环境保护对策措施进行建设。2015年2月2日，河南省环境保护厅作出（2014）12号《行政复议决定书》，维持被告市环保局作出的批复。三原告认为被告市环保局作出的该具体行政行为违法、错误，严重侵害了原告的合法权益，诉至本院请求：1、请求撤销被告市环保局于2013年7月15日作出的关于《漯河华泰置业集团有限公司新建华泰龙庭首府项目环境影响报告书》的审批意见的（漯环监审（2013）16号）具体行政行为；2、诉讼费用由被告承担。
              </p>
            </el-form-item>
            <el-form-item>
              <p class="case-title"><i class="titleIcon"/> 本院认为 </p>
              <p>
                本院认为，行政行为的相对人以及其他与行政行为有利害关系的公民、法人或者其他组织，有权提起诉讼。原告毕某某、张某甲、张某乙所诉具体行政行为系被告市环保局对第三人漯河华泰公司、河南蓝森公司编制的《漯河华泰置业集团有限公司新建华泰龙庭首府项目环境影响报告书》作出的行政审批，是被告市环保局根据环境保护法律、行政法规对第三人漯河华泰公司、河南蓝森公司制作的《漯河华泰置业集团有限公司新建华泰龙庭首府项目环境影响报告书》的编制、内容、结论，可否作为该项目建设和运营期间环境管理依据，是否符合环境要求，以及在项目内建设和运营期间应当注意的问题等方面进行审查作出的审批意见。原告毕某某、张某甲、张某乙养鸡场用地位于漯河华泰置业集团有限公司新建华泰龙庭首府项目范围内，与行政行为有利害关系。根据《环境影响评价的公众参与暂行办法》第三条环境保护行政主管部门在审批或者重新审核建设项目环境影响报告书过程中征求公众意见的活动。第十三条环境保护行政主管部门应当在受理建设项目环境影响报告书后，在其政府网站或者采用其他便利公众知悉的方式，公告环境影响报告书受理的有关信息。环境保护行政主管部门公告的期限不得少于10日，并确保其公开的有关信息在整个审批期限之内均处于公开状态。环境保护行政主管部门根据本条第一款规定的方式公开征求意见后，对公众意见较大的建设项目，可以采取调查公众意见、咨询专家意见、座谈会、论证会、听证会等形式再次公开征求公众意见。
                环境保护行政主管部门在作出审批或者重新审核决定后，应当在政府网站公告审批或者审核结果。
                被告市环保局受理《漯河华泰置业集团有限公司新建华泰龙庭首府项目环境影响报告书》后，没有履行公开审批的有关信息而下发了审批意见，属于程序轻微违法。由于原告毕某某、张某甲、张某乙的养鸡场于2014年10月被临颍县住房和城乡规划局以违法建设为由已被拆除，现对原告毕某某、张某甲、张某乙的土地承包（租赁）权利已不产生实际影响。故对被告市环保局于2013年7月15日作出的关于《漯河华泰置业集团有限公司新建华泰龙庭首府项目环境影响报告书》的审批意见不予撤销。依照《中华人民共和国行政诉讼法》第七十四条第一款第（二）项的规定，判决如下：
              </p>
            </el-form-item>
            <el-form-item>
              <p class="case-title"><i class="titleIcon"/> 裁判结果</p>
              <p>
                被告漯河市环境保护局于2013年7月15日作出的关于《漯河华泰置业集团有限公司新建华泰龙庭首府项目环境影响报告书》的审批意见程序轻微违法，但不予撤销该行政行为。
                如不服本判决，可在判决书送达之日起十五日内，向本院递交上诉状，并按对方当事人或代表人的人数提出副本，上诉于河南省漯河市中级人民法院。
                审判人员
                审判长刘伟
                审判员任盛楠
                审判员汤少成
                裁判日期
                二〇一五年七月十六日
                书记员
                书记员张歌
              </p>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <!-- /*右边 -->
      <el-col class="case-aside">
        <!-- 办理律师 -->
        <div v-bind="caseInfoData.lawyers" class="case-aside-main case-aside-blls case-border">
          <div class="case-aside-title case-title">
            <span class="case-title"><i class="titleIcon"/>办理律师</span>
          </div>
          <el-collapse v-model="activeNames" accordion class="lawyer" @change="handleChange">
            <el-collapse-item v-for="item in caseInfoData.lawyers" :key="item.lawyerId" name="1">
              <template v-if="isShow" slot="title">
                <div class="case-aside-li">
                  <el-col :span="9" class="case-aside-imgBox">
                    <div class="case-aside-img">
                      <img src="@/assets/case/case-avatar.png" alt="">
                      <div class="case-aside-name">{{ item.realName }}</div>
                    </div>
                  </el-col>
                  <el-col :span="15" class="case-aside-p">
                    <p>{{ item.realName }}</p>
                    <p>{{ item.lawfirmName }}</p>
                  </el-col>
                </div>
              </template>
              <div class="case-aside-photo">
                <div class="case-aside-img"><img src="@/assets/case/case-avatar.png" alt=""></div>
                <div>{{ item.realName }} 律师</div>
              </div>
              <div class="case-aside-info">
                <p>毕业院校：<span>北京大学</span></p>
                <p>最高学历：<span>{{ item.highestDegree?item.highestDegree:'暂无' }}</span></p>
                <p>执业地点：<span>北京市 - 朝阳区</span></p>
                <p>所属律所：<span>{{ item.lawfirmName }}</span></p>
                <p>擅长领域：<span v-for="item in caseInfoData.lawyers.practiceareas" :key="item.knowledgeId" >{{ item.name?item.name:'暂无' }}</span>&nbsp;</p>
                <p>业务专长：<span v-for="item in caseInfoData.lawyers.industries" :key="item.knowledgeId" >{{ item.name?item.name:'暂无' }}</span>&nbsp;</p>
                <p>案例总数：<span>{{ item.caseCount }}</span></p>
                <p>更新时间：<span>{{ item.lastModificationTime }}</span></p>
                <p>浏览次数：<span class="case-font-hover">{{ item.clickCount ?item.clickCount:'0' }}</span></p>
                <p>关注人数：<span class="case-font-hover">{{ item.followerCount }}</span></p>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <!-- /* 案件认领-->
        <div class="case-aside-main case-aside-ajrl case-border">
          <div class="case-aside-title case-title">
            <span class="case-title"><i class="titleIcon"/>案件认领</span>
          </div>
          <div >
            <el-form ref="form" label-width="0">

              <el-form-item>
                <div class="case-aside-li">
                  <el-col :span="9" class="case-aside-imgBox">
                    <div class="case-aside-img">
                      <img src="@/assets/case/case-avatar.png" alt="">
                      <div class="case-aside-claim">我要认领</div>
                    </div>
                  </el-col>
                  <el-col :span="15" class="case-aside-p">
                    <p>朱晓彬</p>
                    <p>北京市京师律师事务所</p>
                  </el-col>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="case-aside-li">
                  <el-col :span="9" class="case-aside-imgBox">
                    <div class="case-aside-img">
                      <img src="@/assets/case/case-avatar.png" alt="">
                      <div class="case-aside-claim">我要认领</div>
                    </div>
                  </el-col>
                  <el-col :span="15" class="case-aside-p">
                    <p>朱晓彬</p>
                    <p>北京市京师律师事务所</p>
                  </el-col>
                </div>
              </el-form-item>
            </el-form>

          </div>
        </div>
        <!-- /*相关案例 -->
        <div class="case-aside-main case-aside-xgal case-border">
          <div class="case-aside-title case-title">
            <span class="case-title"><i class="titleIcon"/>相关案例</span>
          </div>
          <div class="case-aside-desc">
            <el-form ref="form" label-width="0">
              <el-form-item class="case-font-hover">1 、 叶#胜等人不服“某甲县政府"行政强制拆除（房屋）财产纠纷关于行政诉讼案 </el-form-item>
              <el-form-item> 2 、 遵义市红花岗区某甲局与遵义市某丙工程有限责任公司关于土地行政管理行政登记案 </el-form-item>
              <el-form-item> 3 、 遵义市红花岗区某甲局与遵义市某乙局及遵义市某丙工程有限公司，遵义某丁实业有限公司关于行政诉讼案</el-form-item>
              <el-form-item>5 、 齐保良与北京市住房和城乡建设委员会关于房屋行政登记案 </el-form-item>
              <el-form-item> 6 、 陈光勇与贵阳市南明区城市综合执法局城建关于行政管理行政处罚一案</el-form-item>
              <el-form-item> 7 、 张爱梅与漯河市召陵区城市管理委员会办公室关于不服强制拆除房屋行政行为案   </el-form-item>
              <el-form-item> 8 、 奉节县万富建材厂与奉节县人民政府及奉节县西部新区管理委员会,奉节县国土资源和房屋管理局,奉节县规划局,奉节县朱衣镇人民政府关于确认行政行为违法案   </el-form-item>
              <el-form-item> 9 、 刘梅瑞,蒋金瑞,赵顺法,马增荣,马文其与杭州市国土资源局及杭州市拱墅区京杭运河综合整治与保护开发指挥部关于拆迁行政许可案   </el-form-item>
              <el-form-item>10 、郑银花与北京市住房和城乡建设委员会及白春生,白志增,郑粟杰,北京万柳置业集团有限公司,梁帅关于房屋登记行为案   </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import setting from '@/plugins/setting'
import axios from 'axios'
export default {
  layout: 'case',
  head() {
    return {
      title: '案例详情',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线案例详情；jingshonline' }
      ]
    }
  },
  components: {
  },

  data() {
    return {
      loading: false,
      caseId: 0,
      isShow: true,
      activeNames: ['1'],
      caseInfoData: []
    }
  },
  async asyncData({ params }) {
    const [caseInfoData] = await Promise.all([
      axios.get(`http://gateway.dev.jingshonline.net/${setting.apiPrefix}/customer/case/get/${params.id}`, { 'Content-Type': 'application/json' })
    ])
    return {
      caseInfoData: caseInfoData.data.entity
    }
  },
  watch: {
  },
  created() {
    this.caseId = this.$route.params.id
  },
  mounted() {
    this.getcaseInfoData()
  },

  methods: {
    ...mapActions('case', ['getCaseInfoData']),
    // 获取案件
    getcaseInfoData(delayTime = 150) {
      this.loading = true
      setTimeout(this.request, delayTime)
    },
    request() {
      this.getCaseInfoData(this.caseId).then(res => {
        this.caseInfoData = res.data.entity
        console.log(this.caseInfoData)
        this.loading = false
      })
    },
    handleChange(val) {
    }
  }
}
</script>

<style lang='scss' scoped>
//本页面公共样式
.caseInfoClass{
  font-family: MicrosoftYaHei;
  font-size: 14px;

// 左边标题
.case-title {
    font-size: 16px;
    color: #333333;
}

img {
    width: 100%;
}
   //边框
.case-border {
    border: solid 1px rgba(229, 229, 229, 0.3);
}
  //  已选择
.case-font-hover {
    color: #f68020 !important;
}

.case-content-hover {
    border-bottom: 4px solid #f68020
}
ul li {
    display: block;
    list-style-type: none;
    width: auto;
    margin: 0 auto;
}
// 标题图标
.titleIcon {
    display: inline-block;
    width: 4px;
    height: 12px;
    background-color: #f68020;
    border-radius: 2px;
    margin-right: 5px;
}
.case-content {
  width: 1004px;
  background:white;
    // 概要信息
  .el-form-item{
margin-bottom: 0;
    line-height: 30px;
}

.el-form-item__label {
    font-size: 14px;
    color: #999999;
}

.case-content-title {
    display: block;
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px rgba(217, 217, 217, 0.3);
    padding: 0 20px;
}

.case-content-desc {
    padding: 20px;
    line-height: 30px;
    color: #999999;
    .el-row{
    padding-bottom: 20px;
    border-bottom: 1px dotted rgba(217, 217, 217, 0.3);
}

  }

.case-content-main {
    padding: 0 20px 20px 20px;
    .el-form-item__content{
      margin: 10px 0;
}

p {
    line-height: 36px;
    color: #333333;
}
  }
}
// 右边
.case-aside{
  width:360px;
  margin-left: 16px;
  .case-aside-main{
    margin-bottom: 20px;
  }
  .case-aside-title{
	height: 49px;
  line-height: 49px;
  padding-left: 20px;
  border-bottom: 1px dotted rgba(217, 217, 217, 0.3);
}
.case-aside-desc{
  padding: 15px;
  line-height: 30px;
	letter-spacing: 0px;
	color: #666666;
}

// 相关案例
.case-aside-xgal {
   background:white;
    .el-form-item{
    margin-bottom: 5px;
}

.el-form-item__content {
    line-height: 30px;
}
}
// 办理律师
.case-aside-blls {
  background:white;
    .el-collapse-item__header{
height: 120px;
}

.case-aside-li {
    width: 100%;
    height: 102px;
    padding: 5px 0px 5px 10px;
    .case-aside-p p{
    color: #333333;
}

.case-aside-p p:nth-child(1) {
    font-size: 16px;
}

.case-aside-imgBox {
    .case-aside-name{
  position: absolute;
    left: 0;
    bottom: 0;
    width: 76px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    background-color: #000000;
    opacity: 0.6;
    font-size: 12px;
    color: #ffffff;
}

.case-aside-img {
    position: relative;
    width: 76px;
    height: 76px;
    background-color: #dbdbdb;
    margin: 8px 15px;
}
}
 }

.case-aside-info {
    margin-bottom: 20px;
    p {
    margin-left: 30px;
    color: #999999;
    line-height: 30px;
    span{
      color: #333333;
}
  }
}

.case-aside-photo {
    margin: auto;
    text-align: center;
    margin-bottom: 20px;
    margin: 30px 70px;
    .case-aside-img{
  margin-bottom: 20px;
    width: 202px;
    height: 202px;
    background-color: #e9e9e9;
}
}
}

// 案件认领
.case-aside-ajrl
{
   background:white;
    .case-aside-imgBox{
.case-aside-claim{
  position: absolute;
    left: 0;
    bottom: 25px;
    width: 76px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    font-size: 12px;
    color: #333333;
}

.case-aside-img
{
    position: relative;
    width: 76px;
    height: 76px;
    background-color: #dbdbdb;
    margin: 8px 15px;
}
}

.case-aside-li
{
    opacity: 0.9;
    background-color: #e5e5e5;
    height: 102px;
    padding: 5px 0px 5px 10px;
    .case-aside-p p{
    color: #333333;
}

.case-aside-p p:nth-child(1)
{
    font-size: 16px;
    margin-top: 10px;
}

}

.el-form-item
{
    margin-bottom: 0;
    padding: 10px;
    border-bottom: solid 1px rgba(217, 217, 217, 0.3);
}
}
}
 }

</style>
<style lang='scss'>
//办理律师隐藏头部
.caseInfoClass{
 .lawyer{
 .el-collapse-item.is-active{
   >div:first-child{
     display: none;
   }
 }
 }
 }
</style>
