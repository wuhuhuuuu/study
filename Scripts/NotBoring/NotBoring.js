/*
脚本功能：NotBoring
脚本作者：wuhuhuuuu

使用声明：此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️

********/

var body = JSON.parse($response.body);
var obj = {
  "request_date_ms": 1668518618109,
  "request_date": "2022-11-15T13:23:38Z",
  "subscriber": {
    "non_subscriptions": {
    },
    "first_seen": "2022-11-15T13:23:15Z",
    "original_application_version": "1",
    "other_purchases": {
    },
    "management_url": "https:\/\/apps.apple.com\/account\/subscriptions",
    "subscriptions": {
      "com.andyworks.calculator.yearlyPatron": {
        "original_purchase_date": "2022-11-15T13:23:29Z",
        "expires_date": "2099-09-09T13:23:28Z",
        "is_sandbox": false,
        "refunded_at": null,
        "unsubscribe_detected_at": null,
        "grace_period_expires_date": null,
        "period_type": "trial",
        "purchase_date": "2022-11-15T13:23:28Z",
        "billing_issues_detected_at": null,
        "ownership_type": "PURCHASED",
        "store": "app_store",
        "auto_resume_date": null
      }
    },
    "entitlements": {
      "patron": {
        "grace_period_expires_date": null,
        "purchase_date": "2022-11-15T13:23:28Z",
        "product_identifier": "com.andyworks.calculator.yearlyPatron",
        "expires_date": "2099-09-09T13:23:28Z"
      },
      "skinAndy": {
        "grace_period_expires_date": null,
        "purchase_date": "2022-11-15T13:23:28Z",
        "product_identifier": "com.andyworks.calculator.yearlyPatron",
        "expires_date": "2099-09-09T13:23:28Z"
      },
      "skinMonster": {
        "grace_period_expires_date": null,
        "purchase_date": "2022-11-15T13:23:28Z",
        "product_identifier": "com.andyworks.calculator.yearlyPatron",
        "expires_date": "2099-09-09T13:23:28Z"
      },
      "skinCedar": {
        "grace_period_expires_date": null,
        "purchase_date": "2022-11-15T13:23:28Z",
        "product_identifier": "com.andyworks.calculator.yearlyPatron",
        "expires_date": "2099-09-09T13:23:28Z"
      },
      "skinKarat": {
        "grace_period_expires_date": null,
        "purchase_date": "2022-11-15T13:23:28Z",
        "product_identifier": "com.andyworks.calculator.yearlyPatron",
        "expires_date": "2099-09-09T13:23:28Z"
      },
      "skinOpal": {
        "grace_period_expires_date": null,
        "purchase_date": "2022-11-15T13:23:28Z",
        "product_identifier": "com.andyworks.calculator.yearlyPatron",
        "expires_date": "2099-09-09T13:23:28Z"
      },
      "skinPresstube": {
        "grace_period_expires_date": null,
        "purchase_date": "2022-11-15T13:23:28Z",
        "product_identifier": "com.andyworks.calculator.yearlyPatron",
        "expires_date": "2099-09-09T13:23:28Z"
      },
      "skinChroma": {
        "grace_period_expires_date": null,
        "purchase_date": "2022-11-15T13:23:28Z",
        "product_identifier": "com.andyworks.calculator.yearlyPatron",
        "expires_date": "2099-09-09T13:23:28Z"
      }
    },
    "original_purchase_date": "2022-10-08T02:55:30Z",
    "original_app_user_id": "03510E70-4D52-4C4A-9F8A-77E8D394ED28",
    "last_seen": "2022-11-15T13:23:15Z"
  }
};
$done({ body: JSON.stringify(obj) });