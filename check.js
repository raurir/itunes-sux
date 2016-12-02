"use strict";
const con = console;
const _ = require("underscore");
const fs = require("fs");
const musicThen = fs.readFileSync("list-then.txt", "utf8");
const musicNow = fs.readFileSync("list-now.txt", "utf8");

const songsThen = [];
_.each(musicThen.split("\n"), (song, index) => {
	var reg = /.(mp3|m4a)/g;
	if (reg.test(song)) {
		// con.log(song, song.replace(reg, ""));
		songsThen.push(song.replace(reg, ""));
	}
});

const songsNow = [];
_.each(musicNow.split("\n"), (song, index) => {
	var lastSlash = song.lastIndexOf("\\");
	if (lastSlash == -1) {
	} else {
		song = song.substr(lastSlash + 1);
		var reg = /.(mp3|m4a)/g;
		if (reg.test(song)) {
			// con.log(song, song.replace(reg, ""));
			songsNow.push(song.replace(reg, ""));
		}
	}
});


const songsMissing = _.difference(songsThen, songsNow);

const songsRenamed = [];
_.each(songsMissing, (songMissing, indexMissing) => {
	var chrs = 9;
	_.each(songsNow, (songNow, indexNow) => {
		if (songMissing.substr(0, chrs) == songNow.substr(0, chrs)) {
			con.log(songMissing, "\n\t\t", songNow);
			songsRenamed.push(songNow);
		}

	});
});

con.log("songsRenamed", songsRenamed.length);
// con.log(songsMissing);
// con.log(musicThen.length, musicNow.length);
con.log(songsThen.length, songsNow.length, songsMissing.length);
