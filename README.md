## Installation
```bash

$ npm install 1cak

```
## Function List
| NUMBER | FUNCTION | Parameter | ASYNC | PUBLIC | COMMENT |
|-|-|-|-|-|-|
| 1.| GetPostID | PostID (Optional) | True | True | If PostID not defined it will give random meme
| 2.| Search | Query (Required)<br/> PageID (Optional) | True | True | If PageID defined, it will find only on pageid parameter
| 3. | GetSectionPosts | Section (Required)<br/> PageID (Optional) | True | True | If PageID defined, it will find only on pageid parameter
| 4. | GetPosts | URL (Required) | False | False | -
| 5. | IsNotFound | HTML (Required) | False | False | -
| 6. | IsValidSection | Section (Required) | False | False | -

Section available (must be lowercase)
1. lol
2. trend
3. recent
4. legendary


## Simple Usage

You  can  see  on [Example  Folder](https://github.com/AthallahDzaki/1CAK/tree/king/test)

##  Credits

Made by [AthallahDzaki](https://github.com/AthallahDzaki)

Thanks to [gilankpam](https://github.com/gilankpam) for the 1cak scraper base from golang.