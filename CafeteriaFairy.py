from lxml import html
import requests
from bs4 import BeautifulSoup

def get_html(url):
   _html = ""
   resp = requests.get(url)
   if resp.status_code == 200:
      _html = resp.text
   return _html

locationCode = "http://stu.kwe.go.kr"
accessCode = "sts_sci_md01_001.do"
schoolCode = "K100000414"
institutionName = "민족사관고등학교"
foodCode = 3
if foodCode == 1:
    foodType = "조식"
elif foodCode == 2:
    foodType = "중식"
else:
    foodType = "석식"

soup = BeautifulSoup(get_html(locationCode + "/" + accessCode + "?" + "schulCode=" + schoolCode + "&insttNm=" + institutionName + "&schulCrseScCode=4&schMmealScCode=" + str(foodCode)), 'lxml')

dictionary = {}

rows = soup.table.find_all('tr')

firstRow = rows.pop(0)

for h in firstRow.find_all('th'):
    temp = [h.text.strip()]
    if temp[0] != "":
        dictionary[temp[0]] = {}

keychain = list(dictionary.keys())

for n in range(len(rows)):
    th = rows[n].find_all('th')
    td = rows[n].find_all('td')
    ah = []
    ad = []
    for h in th:
        temph = h.text.strip()
        ah.append(temph)
    for d in td:
        tempd = d.text.strip()
        ad.append(tempd)

    if len(ah) != 1 or len(ad) != 7:
        continue
    else:
        for x in range(7):
            thisdic = dictionary[keychain[x]]
            thisdic[ah[0]] = ad[x]

days = str(rows[1]).split("</td>")
result = []

for day in days:
    oneday = day.split("<br/>")
    for x in range(len(oneday)):
        if ">" in oneday[x]:
            oneday[x] = oneday[x][oneday[x].rfind(">") + 1:]
    result.append(oneday)

for x in range(7):
    dictionary[keychain[x]][foodType] = result[x]

for key,val in dictionary.items():
    print(key, "→", val)

