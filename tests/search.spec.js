import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { search, searchAlbums, searchTracks, searchArtists, searchPlaylists } from '../src/search';

describe('Search', function() {
  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });
  
  describe('Smoke Tests', function() {
    //search genérico: + de um tipo
    //searchAlbums
    //searchTracks
    //searchArtist
    //searchPlaylists

    it('should exist the search method', function() {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', function() {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchTracks method', function() {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchArtists method', function() {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchPlaylists method', function() {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', function() {
    it('should call fetch function', function() {
      const artists = search();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should receive the correct URL to fetch', function() {
      context('passing one type', () => {
        const artists = search('Ghost', 'artist');
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Ghost&type=artist');

        const albums = search('Ghost', 'album');
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Ghost&type=album');
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Ghost', ['artist', 'album']);
        expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Ghost&type=artist,album');
      });
    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Ghost', 'artist');
      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Ghost');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Ghost');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Ghost&type=artist');

      const artists2 = searchArtists('Muse');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Ghost');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = searchAlbums('Ghost');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Ghost&type=album');

      const albums2 = searchAlbums('Muse');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('Ghost');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = searchTracks('Ghost');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Ghost&type=track');

      const tracks2 = searchTracks('Muse');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      const playlists = searchPlaylists('Ghost');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const playlists = searchPlaylists('Ghost');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Ghost&type=playlist');

      const playlists2 = searchPlaylists('Muse');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });
  });

});
