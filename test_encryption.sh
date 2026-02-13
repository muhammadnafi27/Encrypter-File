#!/bin/bash
# Test Encryption & Decryption Flow using curl

API_BASE="http://localhost:3001/api"

# Test keys
PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0r9JkI/GZYVBzdYXgyl/
qGjpRa7LQiPlExiiWeOrNoS60OrRPM/hfFw+8zG+/63eAzpYRsq01AnyQQgZPTBS
XuoTDbOSQudoHBhgii7QlzIAViCP3zOBGSB5vsHVMbvtiwfX5IHPLVY3RcfAxXEq
bUnbndNw0Cp1Vb3sFJDHs77iGOYIYMf07NnJfqkhdC8CHV77qjgkgUqlXmROFNYb
PNiCGtL3xE8h2uBWPXi6f+UjfIMn8ygSazplyerDbKOI6wrnPzDERCqbQGCUbs98
PntwmcEQSyE6xaS+MufWMzfOOyOkBNXouiw+Y9emvCHzmenYpCrmFYU4hIN2E0me
qQIDAQAB
-----END PUBLIC KEY-----"

PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSv0mQj8ZlhUHN
1heDKX+oaOlFrstCI+UTGKJZ46s2hLrQ6tE8z+F8XD7zMb7/rd4DOlhGyrTUCfJB
CBk9MFJe6hMNs5JC52gcGGCKLtCXMgBWII/fM4EZIHm+wdUxu+2LB9fkgc8tVjdF
x8DFcSptSdud03DQKnVVvewUkMezvuIY5ghgx/Ts2cl+qSF0LwIdXvuqOCSBSqVe
ZE4U1hs82IIa0vfETyHa4FY9eLp/5SN8gyfzKBJrOmXJ6sNso4jrCuc/MMREKptA
YJRuz3w+e3CZwRBLITrFpL4y59YzN847I6QE1ei6LD5j16a8IfOZ6dikKuYVhTiE
g3YTSZ6pAgMBAAECggEAAXW9xriYQT/JEun2w7vX3IzNgOQTGGQzRAyZo1HGb9w/
hw75YBh4kWn6Lakcj5zeutr+nY7t7cIb4YNy2U+qYmnws9mYm8oKmJc6o/prC4EX
K4GSPZOXw1rMPRwOpAePP7VQM48Kpl/AhkU5+qQsDRHD6bX7RBXnNi7YodPW7lHS
+tFyTrIQmERryWRTjgiFQuWhBtqJz7si80uardmLYNx9TopnR3mndRqPtOZo/+S/
IO+P+5p4guyIj1ImwRrgwkKg4PrO6BNNBdOMEDaIzAeZ2mpsUWQ8T9fqrhGhWusx
HX6fWoQEwwBHboebhxl4XRND/Kbhdswj3QrtouNxYQKBgQDwViUeOxNttMWOGEAK
H988mQnzekKVNKXZ6XdEz6k+l3mRGInnmDxPvg7j4fbJKE7HsPckvk4pHNCHYa6E
bGrlUQGyGa4sJH1jb0Ztdcwz+M+YY/KXX5lUqfBOa1a+Zny9YHZZclaZoWUFq3ri
VRF67EF3leUhViz8k7nuMncK/QKBgQDge3b52xBGv/bhSQZxWMe2Dos1BnpCddYI
HKYAjlpoQjP99gsjaZLb1cJUNjnSuLedYkazmziT8DiJ6GXuOND2aeNZdKEbkpcr
51X8QNodGXbn/UNYUdgi9lwtQA+54vozbW7JXdjPFe+TnLXTyt8nLCza5k/aWzKl
SE45CfDgHQKBgQDhVnPQ52Ts/IwqEXShyYZeY8MfxSb+jHFgYnTQUMAHjrCNqWtL
eMI7piCB65CexKswsizXB5NzGrAt7xlY0epb/drQKSHUA5aJD4ECCmue4w+Je1Su
NxUle3xzmlKnjKIyUWpFrV2jB98XNNOvuED+dttfC2zdF9ZwLvYqbqiM5QKBgQDN
tjbURryGqTm7P6lIy5vQKUnGYNY++y8VJfO1xL3yluCAVS3l2MR88klv1HVutlmF
P18dDhxt7ZBSSIbIJIbRmT1/Z5KP6ujfkdJJJMD8M660b3F8iRvxBiR4TyFaLjcs
U5dXrsmVFDwE4HH70QhoJGJCgxYgOryRnE4alRKIvQKBgHqIx3o5lSHU0P/bwUOp
yG3N0aSSNVbcHhNFQmzPpyM0CPes4PxxmQc5aHWIo1AHnmn6KNfQFBg3f+4ixTpi
q5AZ62EMdgfEcZc6GMeDSCYfh74HmKNAjnxVoLpuSKdkGGKlYt3YG+N8z/qKNGxX
p29TovbBWXUl2BIPVpUQedx0
-----END PRIVATE KEY-----"

echo "🚀 Starting Encryption & Decryption Test"
echo ""

# Step 1: Health check
echo "1️⃣  Checking API health..."
curl -s "${API_BASE%/api}/api/health" | jq . && echo "" || echo "❌ API health check failed" && exit 1

echo ""
echo "✅ API is running on port 3001"
echo ""
