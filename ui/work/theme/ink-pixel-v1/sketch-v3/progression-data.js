// Snapshot of retained progression rules; legacy equipment unlocks excluded.
const progressionRules=[
  {
    "id": "starting_gold_50",
    "name": "출발 지원금 1단계",
    "building": "supply_office",
    "cost": 60,
    "costStatus": "trial-3",
    "requiredClear": "first_run_settled",
    "prerequisites": [],
    "effect": {
      "kind": "starting_gold_bonus",
      "amount": 50,
      "scope": "once-per-new-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "starting_gold_100",
    "name": "출발 지원금 2단계",
    "building": "supply_office",
    "cost": 90,
    "costStatus": "trial-3",
    "requiredClear": "first_run_settled",
    "prerequisites": [
      "starting_gold_50"
    ],
    "effect": {
      "kind": "starting_gold_bonus",
      "amount": 100,
      "scope": "once-per-new-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "starting_gold_150",
    "name": "출발 지원금 3단계",
    "building": "supply_office",
    "cost": 130,
    "costStatus": "trial-3",
    "requiredClear": "chapter2_boss_first_clear",
    "prerequisites": [
      "starting_gold_100"
    ],
    "effect": {
      "kind": "starting_gold_bonus",
      "amount": 150,
      "scope": "once-per-new-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "starting_gold_200",
    "name": "출발 지원금 4단계",
    "building": "supply_office",
    "cost": 180,
    "costStatus": "trial-3",
    "requiredClear": "chapter2_boss_first_clear",
    "prerequisites": [
      "starting_gold_150"
    ],
    "effect": {
      "kind": "starting_gold_bonus",
      "amount": 200,
      "scope": "once-per-new-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "attack_bonus_1",
    "name": "공격력 강화 1단계",
    "building": "supply_office",
    "cost": 30,
    "costStatus": "trial-3",
    "requiredClear": "first_run_settled",
    "prerequisites": [],
    "effect": {
      "kind": "attack_bonus_percent",
      "value": 5,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "attack_bonus_2",
    "name": "공격력 강화 2단계",
    "building": "supply_office",
    "cost": 45,
    "costStatus": "trial-3",
    "requiredClear": "first_run_settled",
    "prerequisites": [
      "attack_bonus_1"
    ],
    "effect": {
      "kind": "attack_bonus_percent",
      "value": 10,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "attack_bonus_3",
    "name": "공격력 강화 3단계",
    "building": "supply_office",
    "cost": 65,
    "costStatus": "trial-3",
    "requiredClear": "first_run_settled",
    "prerequisites": [
      "attack_bonus_2"
    ],
    "effect": {
      "kind": "attack_bonus_percent",
      "value": 15,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "attack_bonus_4",
    "name": "공격력 강화 4단계",
    "building": "supply_office",
    "cost": 90,
    "costStatus": "trial-3",
    "requiredClear": "first_run_settled",
    "prerequisites": [
      "attack_bonus_3"
    ],
    "effect": {
      "kind": "attack_bonus_percent",
      "value": 20,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "attack_bonus_5",
    "name": "공격력 강화 5단계",
    "building": "supply_office",
    "cost": 120,
    "costStatus": "trial-3",
    "requiredClear": "chapter1_boss_first_clear",
    "prerequisites": [
      "attack_bonus_4"
    ],
    "effect": {
      "kind": "attack_bonus_percent",
      "value": 25,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "attack_bonus_6",
    "name": "공격력 강화 6단계",
    "building": "supply_office",
    "cost": 160,
    "costStatus": "trial-3",
    "requiredClear": "chapter1_boss_first_clear",
    "prerequisites": [
      "attack_bonus_5"
    ],
    "effect": {
      "kind": "attack_bonus_percent",
      "value": 30,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "attack_bonus_7",
    "name": "공격력 강화 7단계",
    "building": "supply_office",
    "cost": 210,
    "costStatus": "trial-3",
    "requiredClear": "chapter2_boss_first_clear",
    "prerequisites": [
      "attack_bonus_6"
    ],
    "effect": {
      "kind": "attack_bonus_percent",
      "value": 35,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "attack_bonus_8",
    "name": "공격력 강화 8단계",
    "building": "supply_office",
    "cost": 270,
    "costStatus": "trial-3",
    "requiredClear": "chapter2_boss_first_clear",
    "prerequisites": [
      "attack_bonus_7"
    ],
    "effect": {
      "kind": "attack_bonus_percent",
      "value": 40,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "max_health_bonus_1",
    "name": "최대 체력 강화 1단계",
    "building": "supply_office",
    "cost": 30,
    "costStatus": "trial-3",
    "requiredClear": "first_run_settled",
    "prerequisites": [],
    "effect": {
      "kind": "max_health_bonus",
      "value": 5,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "max_health_bonus_2",
    "name": "최대 체력 강화 2단계",
    "building": "supply_office",
    "cost": 45,
    "costStatus": "trial-3",
    "requiredClear": "first_run_settled",
    "prerequisites": [
      "max_health_bonus_1"
    ],
    "effect": {
      "kind": "max_health_bonus",
      "value": 10,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "max_health_bonus_3",
    "name": "최대 체력 강화 3단계",
    "building": "supply_office",
    "cost": 65,
    "costStatus": "trial-3",
    "requiredClear": "first_run_settled",
    "prerequisites": [
      "max_health_bonus_2"
    ],
    "effect": {
      "kind": "max_health_bonus",
      "value": 15,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "max_health_bonus_4",
    "name": "최대 체력 강화 4단계",
    "building": "supply_office",
    "cost": 90,
    "costStatus": "trial-3",
    "requiredClear": "first_run_settled",
    "prerequisites": [
      "max_health_bonus_3"
    ],
    "effect": {
      "kind": "max_health_bonus",
      "value": 20,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "max_health_bonus_5",
    "name": "최대 체력 강화 5단계",
    "building": "supply_office",
    "cost": 120,
    "costStatus": "trial-3",
    "requiredClear": "chapter1_boss_first_clear",
    "prerequisites": [
      "max_health_bonus_4"
    ],
    "effect": {
      "kind": "max_health_bonus",
      "value": 25,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "max_health_bonus_6",
    "name": "최대 체력 강화 6단계",
    "building": "supply_office",
    "cost": 160,
    "costStatus": "trial-3",
    "requiredClear": "chapter1_boss_first_clear",
    "prerequisites": [
      "max_health_bonus_5"
    ],
    "effect": {
      "kind": "max_health_bonus",
      "value": 30,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "max_health_bonus_7",
    "name": "최대 체력 강화 7단계",
    "building": "supply_office",
    "cost": 210,
    "costStatus": "trial-3",
    "requiredClear": "chapter2_boss_first_clear",
    "prerequisites": [
      "max_health_bonus_6"
    ],
    "effect": {
      "kind": "max_health_bonus",
      "value": 35,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "max_health_bonus_8",
    "name": "최대 체력 강화 8단계",
    "building": "supply_office",
    "cost": 270,
    "costStatus": "trial-3",
    "requiredClear": "chapter2_boss_first_clear",
    "prerequisites": [
      "max_health_bonus_7"
    ],
    "effect": {
      "kind": "max_health_bonus",
      "value": 40,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "move_speed_bonus_1",
    "name": "이동속도 강화 1단계",
    "building": "supply_office",
    "cost": 30,
    "costStatus": "trial-3",
    "requiredClear": "first_run_settled",
    "prerequisites": [],
    "effect": {
      "kind": "move_speed_bonus_percent",
      "value": 5,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "move_speed_bonus_2",
    "name": "이동속도 강화 2단계",
    "building": "supply_office",
    "cost": 45,
    "costStatus": "trial-3",
    "requiredClear": "first_run_settled",
    "prerequisites": [
      "move_speed_bonus_1"
    ],
    "effect": {
      "kind": "move_speed_bonus_percent",
      "value": 10,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "move_speed_bonus_3",
    "name": "이동속도 강화 3단계",
    "building": "supply_office",
    "cost": 65,
    "costStatus": "trial-3",
    "requiredClear": "first_run_settled",
    "prerequisites": [
      "move_speed_bonus_2"
    ],
    "effect": {
      "kind": "move_speed_bonus_percent",
      "value": 15,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "move_speed_bonus_4",
    "name": "이동속도 강화 4단계",
    "building": "supply_office",
    "cost": 90,
    "costStatus": "trial-3",
    "requiredClear": "first_run_settled",
    "prerequisites": [
      "move_speed_bonus_3"
    ],
    "effect": {
      "kind": "move_speed_bonus_percent",
      "value": 20,
      "scope": "next-run"
    },
    "maxPurchases": 1
  },
  {
    "id": "extra_dash_1",
    "name": "대시 추가",
    "building": "supply_office",
    "cost": 400,
    "costStatus": "trial-3",
    "requiredClear": "chapter2_boss_first_clear",
    "prerequisites": [
      "move_speed_bonus_4"
    ],
    "effect": {
      "kind": "dash_charges",
      "value": 2,
      "scope": "next-run"
    },
    "maxPurchases": 1
  }
];
