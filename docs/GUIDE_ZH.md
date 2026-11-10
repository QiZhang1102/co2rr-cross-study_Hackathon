# NextExperiment：使用、演示与提交

公开体验地址：https://next-experiment-co2rr.zq20021102mia.chatgpt.site

代码仓库：https://github.com/QiZhang1102/co2rr-cross-study_Hackathon

## 一句话讲清楚

“NextExperiment 帮助科研学生用已有测量结果，在一组可实施的候选条件中决定下一步优先测哪一个，同时展示预测、模型不确定性和选择理由。”

它使用已有的高斯过程与 Expected Improvement，贡献在于把可审计的研究流程做成容易使用的工具，不是发明新算法。没有新做湿实验，也不承诺提高产率或节省某个比例的费用。

## 如何使用

1. 打开网站，点 **Try a CO₂RR example**，默认载入公开 Li 2023 的 8 条 RHE 条件，先揭示 3 条，总预算为 6 条。
2. 看推荐条件、预测均值、Model SD 和 EI。Model SD 是模型估计的标准差，不是成功率，也不是论文实验误差棒。
3. 点 **Reveal historical result** 才揭示那条历史结果；也可在 Candidate notebook 中自己选。模型与当前最好结果曲线会更新。
4. 用完预算后点 **Run paired policy comparison**，比较 Random、GP mean、GP-EI。同起点、同预算，数值现场计算。单次回放不能证明算法普遍更好。
5. **Use your own data**：下载两张示例 CSV 后重新上传，或先点 Load simulated sample。映射变量和目标，选择最大化／最小化，声明公开或模拟来源和单位。
6. 取消 Available 可排除不可做条件。填入同一测量语境的公开／模拟结果，勾选确认，点 **Add result & refit**。
7. 下载推荐 CSV、已知结果 CSV 和 Decision report。报告为可独立打开的 HTML，可用浏览器打印成 PDF。刷新网页会清空当前实验任务，请先导出。

自定义数据只支持 1–3 个数值条件变量、1 个数值目标；至少 2 条不同的已测条件（建议 3 条以上），最多 200 条已测和 1,000 条候选。候选未知结果保持空白，不能填 0。重复行、缺失数值、错误字段会显示提示。不同电位参考、单位、电解液或测量定义不能直接混合。

## 公开案例的边界

- 默认：Figures 3a/3c，−0.91 V vs RHE，压力与预平衡时间，8 个不同条件。
- 另一案例：Figure 2c，V vs Ag/AgCl，4 个电位条件。保留原始电位参考，不进行跨参考换算。
- 两个候选池独立，不照搬原研究 11 条混合扫描坐标建模。
- 目标是 acetate FE (%)。固定 solution B、催化剂和 1 h CO₂RR，细节见页面来源。
- 公开数值从图中明确标签核对；原论文图片、PDF、私有仓库附件均未公开复制。原研究仓库未改动。
- Simulated sample 和 synthetic surface 全部是模拟值，不能作为真实化学实验结果展示。

## 如何录制三分钟视频

按 `DEMO_SCRIPT_EN.md` 录屏：25 秒讲问题，40 秒公开回放，25 秒手动选择与比较，45 秒 CSV 与补充结果，25 秒导出与隐私，20 秒真实用户证据与收尾。录制时使用部署网址。脚本已提供，视频仍需实际录制与提交。

不要说“AI 已经完成实验”“成功率为 X%”“节省 X% 成本”或“已经验证 10 位用户”，除非有对应真实证据。Health & Bio 赛道适配需要向主办方核实：这是科研决策工具，首例是电化学，没有患者数据或临床效果验证。

## 十位真实用户怎么记录

让科研同学按 `USER_TRIAL.md` 完成任务。你负责邀请，系统不会擅自联系任何人。每个真实独立用户分配匿名编号，填写空白 `participant-ledger.csv`。确认同一人只算一次，不把开发测试、机器人或重复访问计算进去。

可选匿名事件只保存在参与者自己的浏览器，**没有后台自动汇总**。参与者同意后启用，试用结束下载 trial record 与 feedback，并自愿发给你。开发与录屏测试必须勾选 QA。事件不含上传表格、实验数值或个人信息。没有启用事件记录的同学也可用经同意的观察记录证明试用。

访问数、session 数不能直接当独立人数。脚本 `summarize-evidence.mjs` 只做事件去重和 QA 过滤，最终人数须由你结合试用名册确认。不要把原始联系信息或未经同意的评价上传公开仓库。

## 开发与部署

本地 Node.js 22+：`npm test`，`npm run dev`。不需要安装运行依赖。默认端口 4173；冲突时用 `PORT=4187 npm run dev`。

`npm run build` 生成 dist；任意静态 HTTPS 托管均可部署。当前 Sites 身份保存在 `.openai/hosting.json`。仓库另附 GitHub Pages 手动工作流；若用它，需要在仓库 Settings → Pages 选择 GitHub Actions，再手动运行 Deploy static site。不要付费开资源，不要修改仓库可见性。

截止时间按你提供的信息：**2026 年 11 月 14 日中午 12:00，America/Los_Angeles（PST）**。建议 13 日前完成真实试用与反馈，14 日上午锁定版本并提交仓库、视频和真实证据。

网站已公开上线并通过线上浏览器完整流程检查；27 项核心测试通过。实际测试、上线状态及局限以 `VERIFICATION.md` 为准。当前交付不包含编造的用户、评价、使用量或节省时间数据。
