const axios = require('axios');
const cheerio = require('cheerio');

// Variabel URL dan lain-lain
const BaseURL = "http://1cak.com"

// Export
exports.GetSectionPosts = function(section, pageid = 0)
{
  let url;
  if(!IsValidSection(section)) throw Error("Invalid Section");

  if(pageid == 0) {
		url = BaseURL + "/" + section
	} else {
		url = BaseURL + "/" + section + "-" + pageid
	}

  return GetPosts(url);
}

exports.Search = function (query, pageid = 0)
{
  let url;
  if(pageid == 0){
    url = BaseURL + "/search-0-" + encodeURIComponent(query);
  } else {
    url = BaseURL + "/search-"+ pageid +"-" + EncodeURIComponent(query);
  }

  return GetPosts(url);
}

exports.GetPostID = async function (id)
{
  let url;
  if(id == "" || id == undefined){
    url = BaseURL + "/shuffle";
  } else {
    url = BaseURL + "/" + id;
  }

  let data = await axios.get(url).then(res => res.data).catch(e => Error(e))
  if(IsNotFound(data)) throw Error("Post not found");
  let $ = cheerio.load(data);
  let string = $(".fb-comments").attr("data-href");
  let pid = string.split('/')[3]; // Post iD
  let p = {
    "id" : pid,
    "title" : $("h3").text(),
    "nsfw" : false, // Ignore That
    "img" : $("img[title]").attr("src"),
    "url" : string,
    "votes" : $("#span_vote_" + pid).text()
  }
  p = JSON.stringify(p);
  return p;
}

// Static Definition And Always Used
async function GetPosts(url)
{
  let postingan = [];
  let data = await axios.get(url).then(res => res.data).catch(e => Error(e));
  if(IsNotFound(data)) throw Error("Post not found")
  let $ = cheerio.load(data);
  $("table").each(function (){
    let id = $(this).find(".upperSpan").attr("rel")
    if(id != "")
    {
      let nsfw = false
      let img = $(this).find("img").attr("src")
      postingan.push({
        "id" : id,
        "title" : $(this).find("h3").text(),
        "img" : img,
        "votes" : $(this).find("#span_vote_"+id).text(),
        "url" : BaseURL + "/" + id,
        "nsfw" : nsfw
      })
    }
  })
  postingan.pop(); // Pop For Remove Undefined
  let next = $("#next_page_link").attr("href")
	let nextSplit = next.split("-")
  if(nextSplit.length > 3) throw Error("index out of range");

  let p = {
    page : {
      next : nextSplit[1]
    }, post : postingan
  }

  p = JSON.stringify(p);
  return p;
}

function IsNotFound(html)
{
  return html.includes('src="templates/v1/img/error.png"')
}

function IsValidSection(section)
{
  sections = ["lol", "trend", "recent", "legendary"];
  for(let i = 0; i < sections.length; i++){
    if(sections[i] == section){
      return true;
    }
  }
  return false;
}
