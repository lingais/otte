const Chinese = {
  translation: {
    common: {
      //Only change the text on the right in quote marks!
      language: '語言',
      bond: '結合',
      wrap: '打包',
      stake: '抵押',
      unstake: '取消抵押',
      staking: '抵押中',
      migrate: '遷移',
      pearlChests: 'Pearl Chests',
      roi: '投資報酬率（ROI）', //Return on Investment
      max: '最大值',
      apy: '年度百分比收益率（APY）', //Annualised Percentage Yield
      tvl: '總鎖定價值（TVL）', //Total Value Locked
      amount: '數量',
      approve: '許可',
      claimed: '已認領',
      claim: '認領',
      pending: '待定',
      notEligible: '不符合資格',
      clamPrice: 'CLAM 價格',
      pearlPrice: 'PEARL 價格',
      connectWallet: '連結錢包',
      price: '價格',
      buy: '購買',
      buyThing: '購買 ', //e.g. "Buy CLAM", "Buy sCLAM"
      addLiquidity: '加入流動性',
      redeem: '贖回',
      treasuryBalance: '金庫餘額',
      currentIndex: '當前指數',
      yourBalance: '你的餘額',
      currentApy: '當前年度百分比收益率（APY）',
      dashboard: '儀表板',
      calculator: '計算機',
      helpTranslate: '協助我們翻譯',
    },
    time: {
      days: '天',
      day: '天',
      hours: '小時',
      hour: '小時',
      minutes: '分鐘',
      minute: '分鐘',
      seconds: '秒',
      second: '秒',
      today: '今天',
    },
    // src\views\Dashboard
    dashboard: {
      marketCap: '市值',
      stakingRatio: '抵押率',
      circulatingSupply: '總流通量',
      backingPerClam: 'ClAM 單位支持額',
      otterKingdom: '歡迎來到海獺王國',
      decentralized: '一個去中心化的儲備迷因幣',
      clamStaked: 'CLAM stakes',
      apyOverTime: '整體年度百分比收益率（APY）',
      runway: '現有生命週期（Runway）',
      totalValueDeposited: '總寄存額',
      marketValue: '金庫資產市值',
      riskFree: '金庫無風險收益值',
      pol: '協議自有流動性（POL）',
      tooltipItems: {
        tvl: '總計存額',
        current: '當前',
        lpTreasury: 'LP 金庫',
        marketLP: '市場 LP',
      },
      tooltipInfoMessages: {
        tvl: '存款總額（Total Value Deposited，簡稱 TVL），是協定中所有 CLAM 賭注的金額。這個度量常常被 DeFi 的專案用來當作評估成長或健康度的指標。',
        mvt: '國庫資產的市值（Market Value of Treasury Assets，簡稱 MVT），是所有金庫資產的價值總和。',
        rfv: '無風險收益率（Risk Free Value，簡稱 RFV），是金庫保證能用來支撐 CLAM 的基金的數量。',
        pol: '協議擁有的流動性（Protocol Owned Liquidity，簡稱 POL）, 是金庫所持有並控制的 LP 數量。越多的 POL 對協定本身與其使用者來說越好。',
        holder: '持有人就是 Otters (sCLAM 持有者) 的總數量',
        staked: 'CLAM Staked, 是 sCLAM 對 CLAM 的比率 (staked vs unstaked)',
        apy: '百分比收益率（Annual Percentage Yield，簡稱 APY），是利率的標準化表示，基於一年的複利期。注意，APY 提供的是指數的概況，沒辦法非常精確地預測未來的結果。',
        runway:
          '生命週期（Runway）是 sCLAM 的發行能維持在一定比率的天數。越低的年度百分比收益率（APY） ，越長的生命週期（Runway）。',
        currentIndex:
          '當前指數從開始抵押的時候開始追蹤 sCLAM 累積的數量。基本上就是一個人在一天當中可以擁有多少 sCLAM，如果他們抵押或是持有單一顆 CLAM',
      },
    },
    // src\views\Bond
    bonds: {
      debtRatio: '負債比率',
      vestingTerm: '持有期限',
      recipient: '接收者',
      purchased: '已購買',
      bondPrice: '債券價格',
      deprecated: '棄用',
      bondDiscount: '折扣！',
      myBond: '我的債券',
      fullyVested: '期滿',
      fullyVestedAt: '期滿於',
      advancedSettings: {
        txrevert: '如果價格改動超過滑移百分比，程序可能反轉。',
        recipientAddress: '選擇接收者的地址。預設值為你目前連線的地址。',
      },
      purchase: {
        noValue: '請輸入數值！',
        invalidValue: '請輸入合法的數值！',
        resetVestingAutostake: '你已經擁有此債券，「結合」將會重設你的持有期限（vesting term）。你還是想要執行嗎？',
        resetVesting:
          '你已經擁有此債券。「結合」將會重設你的持有期限並且喪失獎勵資格。我們建議你可以先認領獎勵或是使用一個全新的錢包。你還是想要執行嗎？',

        fourFourInfo:
          '備註:  (4, 4) 債券會在一開始抵押所有 CLAM，所以你會得到你在持有期限內所有的 rebase 獎勵。一旦期滿，你就只能認領 sClam。',
        approvalInfo:
          '備註:  附註:  「許可（Approve）」 程序只有在第一次結合時需要；往後結合時只需要執行「結合（Bonding）」的程序。',
        roiFourFourInfo: '* （4, 4）債券的投資報酬包含五天的抵押獎勵。',

        youWillGet: '你將會獲得 ',
        maxBuy: '你可以購買的最大值為',
      },
      purchaseDialog: {
        bondSuccessful: '結合成功',
      },
      redeem: {
        fullyVestedPopup: '（4, 4）債券期滿後你只能認領。',
        claimAndAutostake: '認領並自動抵押',
        pendingRewards: '待定的獎勵',
        claimableRewards: '可認領的獎勵',
        timeUntilFullyVested: '期滿之前的時間',
      },
    },
    // src\views\Landing
    landing: {
      description: {
        part1: '去中心化的',
        part2: '儲備迷因幣',
        tagline: '第一個價值迷因商店',
      },
      appButton: '進入 APP',
      footer: {
        joinOurCommunity: '加入我們的社群',
        letsMakeIt: '讓我們一起完成吧！',
        contactUs: '聯絡我們',
      },
      splashPage: {
        howOtterClamWorks: 'OtterClam 的運作模式',
        treasuryRevenue: '國庫收益',
        bondsLPFees: '債券與 LP 費用',
        bondSales: '債券的銷售以及 LP 的費用增加了 Otter 的金庫收益，且會被鎖進流動性中協助控制 CLAM 的供應',
        treasuryGrowth: '金庫成長',
        otterTreasury: 'Otter 金庫',
        treasuryInflow:
          '金庫引入（Treasury Inflow）是用來提升 Otter 金庫餘額、支撐優秀的 CLAM 代幣並控制抵押的年度百分比率收益（APY)。',
        stakingRewards: '抵押獎勵',
        clamToken: 'CLAM 代幣',
        compounds: '複利透過一個由金庫支撐且具內在價值的迷因幣自動產生。',
        treasuryBalance: '金庫餘額',
        totalStaked: '抵押總額',
      },
    },
    // src\views\Stake
    stake: {
      clamStaking: 'CLAM 抵押',
      connectWalletDescription: '連結你的錢包來抵押 CLAM 代幣！',
      approvalInfo:
        '附註:  「許可」 程序只有在第一次抵押 / 取消抵押時需要；往後抵押 / 取消抵押時只需要執行「抵押」或是「取消抵押」的程序。',
      balanceInWarmup: '你的抵押餘額醞釀中',
      stakedBalance: '你的抵押餘額',
      nextRewardAmount: '下一次獎勵數量',
      nextRewardYield: '下一次獎勵成果',
      roiFiveDay: '投資報酬 (5日比率)', //Return on Investment
      stakeSuccessful: '抵押成功',
      unstakeSuccessful: '取消抵押成功',
      youReceived: '你已獲得 ',
    },
    // src\views\Stake
    wrap: {
      wrapsClam: '打包 sCLAM',
      connectWalletDescription: '連結你的錢包來打包 sCLAM！',
      approvalInfo:
        '附註：「許可（Approve）」 程序只有在第一次打包時需要；往後鑄造時只需要執行「打包（Wrap）」的程序。',
      description:
        'PEARL 是 sCLAM 指數校正的包裝。有些人可能會覺得這對跨鏈來說是很有用的。不同於 sCLAM 餘額，你的 PEARL 餘額不會隨著時間增長；而當 PEARL 被解開時，你將獲得基於最新（且不斷增加的）指數換算的 sCLAM，所以總產值是一樣的。',
      stakedBalance: '你的餘額 (已抵押的)',
      wrappedBalance: '你的餘額 (已打包的)',
      currentIndex: '當前指數',
      indexAdjustedBalance: '指數校正餘額',
      youWillGet: '你將獲得',
    },
    // src\views\Calculator
    calculator: {
      current: '當前',
      estimateReturns: '預估你的收益',
      yoursClamBalance: '你的 sCLAM 餘額',
      sClamAmount: 'sCLAM 數量',
      purchasePrice: '購買時的 CLAM 價格 ($)',
      futurePrice: '未來 CLAM 的市場價格 ($)',
      results: '結果',
      initialInvestment: '你的初始投資',
      currentWealth: '當前財產',
      rewardEstimation: 'CLAM 獎賞預估',
      potentialReturn: '可能的收益',
      potentialPercentageGain: '可能的成長比率',
    },
    // src\components
    components: {
      wrapped: '已打包',
      staked: '已抵押',
      notStaked: '沒有抵押',
      disconnect: '取消連結',
      buy: '購買',
      buyOnQuickswap: '到 Quickswap 購買',
      buyPearl: '購買 PEARL',
      addTokenToWallet: '把 Token 加入錢包',
      toNextHarvest: '到下一次收成',
      harvesting: '收成中',
      name: '名稱',
    },
    // src\components\NFT
    nft: {
      which: '你會得到哪個 ',
      willYouGet: ' 呢？',
      safehandDescription: '在交付日頒給每位持有 4 顆以上 sCLAM 至少兩週的 Otter。',
      furryhandDescription: '在交付日頒給每位持有 40 顆以上 sCLAM 至少兩週的 Otter。',
      stonehandDescription: '在交付日頒給每個從 Otter 創始日 11/9 就抵押 56 顆以上 sCLAM 的錢包。',
      diamondhandDescription: '獎勵從 IDO 或 Otter 創始日 11/9 到交付日抵押全數 CLAM 並擁有至少 20 顆 sCLAM 者',
      giveawayParty: '放送派對',
      giveawayPartyHeld: '放送派對即將舉行',
      airdropCountdown: '空投倒數',
      connectWallet: '請連結你的錢包來認領 NFT',
      claimYourNFT: '認領你的 NFT',
    },
    pearlChests: {
      title: 'PEARL Chests',
      description:
        'PEARL Chests 像是個人的保險庫，你可以將你的 PEARL 鎖在裡頭。一旦你的 PEARL 被放進一個 Chest 裡，它們將被鎖在裡頭一段時間，生產出更多的 CLAM。',
      readMore: '閱讀更多',
      locked: '鎖定',
      unlocked: '解鎖',
      lockupAmount: '鎖定數量',
      currentReward: '當前獎勵',
      nextReward: '下一次獎勵 (x{{boost}})',
      rewardRate: '講利率',
      lockedValue: '鎖定價值',
      marketValue: '市場價值',
      lockupPeriod: '鎖定期間',
      dueDate: '到期日',
      apy: '年度百分比收益（APY）',
      addPearl: '新增PEARL',
      claimRewardAndRelock: '認領並重新鎖定 ({{amount}} PEARL)',
      claimReward: '認領獎勵',
      redeemAll: '贖回全部',
      claimAllAndRelock: '認領全部並重新鎖定',
      lockUpModal: {
        title: 'PEARL Chest 鎖定',
      },
      lockUp: {
        tabLabel: '鎖定',
        title: '比較所有 PEARL Chests',
        days: '天',
        boost: '提升',
        rewardBoost: '獎勵提升',
        expectedAPY: '預期年度百分比收益率（APY）',
        youWillGet: '你將獲得：',
        noExtraBonus: '沒有額外的票據獎勵',
        bonusTitle: '+{{percentage}}% Off',
        bonusDescription: '任何 (4,4) 債券',
        nftRequirement: '至少需要： \n{{amount}} PEARL',
        select: '選擇',
      },
      redeem: {
        tabLabel: '贖回',
        connect: '連結錢包，查看你的 PEARL Chests！',
      },
    },
  },
};
export default Chinese;
