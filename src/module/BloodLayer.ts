import { BloodNGuts } from '../blood-n-guts';
import { MODULE_ID } from '../constants';
import TileSplat from './TileSplat';
import { getRGBA } from './helpers';
import { log, LogLevel } from './logging';

import * as splatFonts from '../data/splatFonts';

//@ts-expect-error missing definition
export default class BloodLayer extends TilesLayer {
  dataArray: any;
  defaults: any;
  layer: PIXI.Container;
  collection: TileSplatData[];
  splatData: any;
  DEFAULTS: BrushSettings;
  DEFAULTS_TILESPLAT: TileSplatData;
  constructor() {
    super();
    //this._registerMouseListeners();
    //this.dataArray = 'flags["blood-n-guts"].sceneSplats';

    this.DEFAULTS = {
      visible: true,
      brushSize: 50,
      brushAlpha: 0.7,
      previewAlpha: 0.4,
      brushColor: '#8A0707',
      brushFont: 'splatter',
      brushSpread: 1.0,
      brushDensity: 1,
    };

    this.DEFAULTS_TILESPLAT = {
      alpha: 0.7,
      width: 0,
      height: 0,
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
      hidden: false,
      locked: false,
      drips: [],
      styleData: {
        fontFamily: 'splatter',
        fontSize: 50,
        fill: getRGBA('blood'),
        align: 'center',
      },
      offset: new PIXI.Point(0),
      maskPolygon: [],
    };

    // React to changes to current scene
    // Hooks.on('updateScene', (scene, data) => this.updateSceneHandler(scene, data));
    // this.layer = BloodLayer.getCanvasContainer();
    // this.addChild(this.layer);
  }

  initialize(): void {
    this.collection = canvas.scene.getFlag(MODULE_ID, 'sceneSplats') || [];
  }

  // static getCanvasContainer() {
  //   const container = new PIXI.Container();
  //   const d = canvas.dimensions;
  //   container.width = d.width;
  //   container.height = d.height;
  //   container.x = 0;
  //   container.y = 0;
  //   container.zIndex = 0;
  //   return container;
  // }

  /** @override */
  static get layerOptions() {
    return mergeObject(super.layerOptions, {
      // //@ts-expect-error definition missing
      zIndex: 11,
      canDragCreate: true,
      objectClass: TileSplat,
      sortActiveTop: false,
      rotatableObjects: true,
      sheetClass: TileConfig,
      snapToGrid: false,
      controllableObjects: true,
    });
  }

  // /**
  //  * Handler called when scene data updated. Draws splats from scene data flags.
  //  * @category GMandPC
  //  * @function
  //  * @param scene - reference to the current scene
  //  * @param changes - changes
  //  */
  // public updateSceneHandler(scene, changes): void {
  //   if (!scene.active || BloodNGuts.disabled || !changes.flags || changes.flags[MODULE_ID]?.sceneSplats === undefined)
  //     return;
  //   log(LogLevel.DEBUG, 'updateSceneHandler');
  //   if (changes.flags[MODULE_ID]?.sceneSplats === null) {
  //     BloodNGuts.wipeSceneSplats();
  //     return;
  //   }
  //   this.collection = BloodNGuts.trimTileSplatData(duplicate(changes.flags[MODULE_ID]?.sceneSplats));
  // }

  /** @override */
  _onClickLeft(event) {
    const p = event.data.getLocalPosition(canvas.app.stage);
    // Round positions to nearest pixel
    p.x = Math.round(p.x);
    p.y = Math.round(p.y);

    if (game.activeTool === 'brush') {
      const data = this._getNewDrawingData(event.data.origin);
      const drawing = new TileSplat(data);
      this.collection.push(data);
      this.draw();
      ////@ts-expect-error definition missing
      // event.data.preview = this.preview.addChild(drawing);
      // drawing.draw();
    }

    // Standard left-click handling
    super._onClickLeft(event);
  }

  /** @override */
  _onDragLeftStart(event) {
    // super._onDragLeftStart(event);
    //@ts-expect-error definition missing
    const grandparentCall = PlaceablesLayer.prototype._onDragLeftStart.bind(this);
    grandparentCall(event);
    //super.__proto__.__proto__.__proto__._onDragLeftStart(event);
    const data = this._getNewDrawingData(event.data.origin);

    const drawing = new TileSplat(data);
    //@ts-expect-error definition missing
    event.data.preview = this.preview.addChild(drawing);
    drawing.draw();
    // const tile = Tile.createPreview(event.data.origin);
    // event.data.preview = this.preview.addChild(tile);
    // this.preview._creating = false;
  }

  /** @override */
  _onDragLeftMove(event) {
    const { preview, createState } = event.data;
    if (!preview) return;
    if (preview.parent === null) {
      // In theory this should never happen, but rarely does
      // @ts-expect-error missing def
      this.preview.addChild(preview);
    }
    if (createState >= 1) {
      preview._onMouseDraw(event);
    }
  }

  /**
   * Conclude a left-click drag workflow originating from the Canvas stage.
   * @see {Canvas#_onDragLeftDrop}
   */
  _onDragLeftDrop(event) {
    const object = event.data.preview;
    if (object) {
      const tileSplatData: TileSplatData = {
        // img: string; //not used
        width: 100,
        height: 100,
        scale: 1,
        x: object.data.x,
        y: object.data.y,
        // z: number;
        rotation: 0,
        hidden: false,
        locked: false,
        drips: [],
        styleData: this.splatData.styleData,
        offset: this.splatData.offset,
        maskPolygon: this.splatData.maskPolygon,
      };

      // Begin iteration
      for (let i = 0; i < object.data.points.length; i++) {
        const dripData: SplatDripData = {
          x: object.data.points[i][0],
          y: object.data.points[i][1],
          angle: 0,
          width: 100,
          height: 100,
          glyph: 'a',
        };

        tileSplatData.drips.push(dripData);
      }

      const obj: TileSplat = new TileSplat(tileSplatData, canvas.scene);
      obj.zIndex = obj.z || 0;
      this.collection.push(object.data);
      this.draw();
      // this.constructor.placeableClass.create(object.data);
    }
  }

  /** @override */
  async draw(): Promise<any> {
    //await super.draw();

    // Create objects container which can be sorted
    //@ts-expect-error definition missing
    this.objects = this.addChild(new PIXI.Container());
    //@ts-expect-error definition missing
    this.objects.sortableChildren = true;

    // Create preview container which is always above objects
    //@ts-expect-error definition missing
    this.preview = this.addChild(new PIXI.Container());

    // Create and draw objects
    //const dataArray = [this.defaults]; //[canvas.scene.data['flags'][MODULE_ID].sceneSplats] || [];
    if (!this.collection || !this.collection.length) return;

    const promises = this.collection.map((data) => {
      const obj = this.createObject(data);
      return obj.draw();
    });

    // Wait for all objects to draw
    //@ts-expect-error missing definition
    this.visible = true;
    return Promise.all(promises);
  }

  /**
   * Draw a single placeable object
   * @return {PlaceableObject}
   */
  createObject(data) {
    const obj = new TileSplat(data);
    obj.zIndex = data.z || 0;
    // @ts-expect-error missing def
    this.objects.addChild(obj);
    return obj;
  }

  /** @override */
  activate() {
    //super.activate();
    CanvasLayer.prototype.activate.apply(this);
    //@ts-expect-error definition missing
    this.objects.visible = true;
    //@ts-expect-error missing definition
    this.placeables.forEach((l) => l.refresh());
    return this;
  }

  /* -------------------------------------------- */

  /** @override */
  deactivate() {
    CanvasLayer.prototype.deactivate.apply(this);
    //@ts-expect-error definition missing
    if (this.objects) this.objects.visible = true;
    //@ts-expect-error definition missing
    this.releaseAll();
    //@ts-expect-error missing definition
    this.placeables.forEach((l) => l.refresh());
    //@ts-expect-error missing definition
    if (this.preview) this.preview.removeChildren();
    return this;
  }

  async updateMany(data, options = {} as any) {
    // //@ts-expect-error definition missing
    this.updateNonEmbeddedEntity(data, options);
  }

  async deleteMany(data, options = {}) {
    const collection = this.collection;
    const user = game.user;

    // Structure the input data
    data = data instanceof Array ? data : [data];
    const ids = new Set(data);

    this.collection = collection.filter((splat) => !ids.has(splat._id));

    // // Iterate over elements of the collection
    // const deletions = collection.reduce((arr, d) => {
    //   if (!ids.has(d._id)) return arr;

    //   // Add the id to the pending array
    //   arr.push(d._id);
    //   return arr;
    // }, []);
    this.draw();
    //if (!deletions.length) return [];
  }

  public updateNonEmbeddedEntity(data, options = {} as any) {
    const user = game.user;
    options = mergeObject({ diff: true }, options);

    //   // Structure the update data
    const pending = new Map();
    data = data instanceof Array ? data : [data];
    for (const d of data) {
      if (!d._id) throw new Error('You must provide an id for every Embedded Entity in an update operation');
      pending.set(d._id, d);
    }

    // Difference each update against existing data
    const updates = this.collection.reduce((arr, d) => {
      if (!pending.has(d._id)) return arr;
      let update = pending.get(d._id);

      // Diff the update against current data
      if (options.diff) {
        update = diffObject(d, expandObject(update));
        if (isObjectEmpty(update)) return arr;
        update['_id'] = d._id;
      }

      //     // Call pre-update hooks to ensure the update is allowed to proceed
      // if (!options.noHook) {
      //   const allowed = Hooks.call(`preUpdate${embeddedName}`, this, d, update, options, user._id);
      //   if (allowed === false) {
      //     console.debug(`${vtt} | ${embeddedName} update prevented by preUpdate hook`);
      //     return arr;
      //   }
      // }

      // Stage the update
      arr.push(update);
      return arr;
    }, []);
    if (!updates.length) return [];

    updates.forEach((update) => {
      //@ts-expect-error definition missing
      const s = this.get(update._id);
      s.data = mergeObject(s.data, update);
      s.refresh();
    });
  }

  // }

  // addSplatsToCollection(splatDatas) {
  //   // Prepare created Entities
  //   const entities = splatDatas.map((data) => {
  //     // Create the Entity instance
  //     const entity = new this(data);
  //     if (temporary) return entity;

  //     // Add it to the EntityCollection
  //     this.collection.insert(entity);

  //     // Trigger follow-up actions and return
  //     entity._onCreate(data, options, userId);
  //     Hooks.callAll(`create${type}`, entity, options, userId);
  //     return entity;
  //   });

  //   // Log creation
  //   let msg = entities.length === 1 ? `Created ${type}` : `Created ${entities.length} ${type}s`;
  //   if (entities.length === 1) msg += ` with id ${entities[0].id}`;
  //   else if (entities.length <= 5) msg += ` with ids: [${entities.map((d) => d.id)}]`;
  //   console.log(`${vtt} | ${msg}`);

  //   // Re-render the parent EntityCollection
  //   if (options.render !== false) {
  //     this.collection.render(false, { entityType: this.entity, action: 'create', entities: entities, data: result });
  //   }

  //   // Return the created Entities
  //   return entities;
  // }

  get brushStyle(): SplatStyle {
    const brushSettings: Partial<BrushSettings> = {};
    // Update with User Defaults
    ['brushFont', 'brushSize', 'brushColor', 'brushAlpha'].forEach((setting) => {
      brushSettings[setting] = this.findSetting(setting);
    });

    return {
      fontFamily: brushSettings.brushFont,
      fontSize: brushSettings.brushSize,
      fill: hexToRGBAString(parseInt(brushSettings.brushColor.slice(1), 16), brushSettings.brushAlpha),
      align: 'center',
    };
  }

  findSetting(name) {
    let setting = this.getUserSetting(name);
    if (setting == null) setting = this.getSetting(name);
    if (setting == null) {
      setting = this.DEFAULTS[name];
      log(LogLevel.INFO, 'findSetting default', name, setting);
    }
    return setting;
  }

  getSetting(name) {
    const setting = canvas.scene.getFlag(MODULE_ID, name);
    if (setting != undefined) log(LogLevel.INFO, 'getSetting', name, setting);
    return setting;
  }

  async setSetting(name, value) {
    const v = await canvas.scene.setFlag(MODULE_ID, name, value);
    return v;
  }

  getUserSetting(name) {
    const setting = game.user.getFlag(MODULE_ID, name);
    if (setting != undefined) log(LogLevel.INFO, 'getUserSetting', name, setting);
    return setting;
  }

  async setUserSetting(name, value) {
    const v = await game.user.setFlag(MODULE_ID, name, value);
    return v;
  }

  /**
   * Get initial data for a new drawing.
   * Start with some global defaults, apply user default config, then apply mandatory overrides per tool.
   * @param {Object} origin     The initial coordinate
   * @return {Object}           The new drawing data
   * @private
   */
  _getNewDrawingData(origin): any {
    const tool = game.activeTool;

    const style = this.brushStyle;

    const tileData = mergeObject(this.DEFAULTS_TILESPLAT, {
      styleData: style,
      drips: BloodNGuts.generateDrips(
        new PIXI.TextStyle(style),
        BloodNGuts.allFonts[style.fontFamily],
        this.findSetting('brushDensity'),
        this.findSetting('brushSpread'),
        new PIXI.Point(0),
      ),
      x: origin.x,
      y: origin.y,
    } as any);

    // Get User Settings
    //const saved = game.settings.get('core', this.constructor.DEFAULT_CONFIG_SETTING);

    // Get defaults
    //const defaults = mergeObject(CONST.DRAWING_DEFAULT_VALUES, saved, { inplace: false });

    const data = {
      author: '',
      fontFamily: 'Signika',
      fontSize: 48,
      height: 0,
      hidden: false,
      locked: false,
      rotation: 0,
      text: '',
      texture: '',
      width: 0,
      x: origin.x,
      y: origin.y,
      z: 0,
    };

    // Optional client overrides
    // const data = mergeObject(
    //   defaults,
    //   {
    //     fillColor: game.user.color,
    //     strokeColor: game.user.color,
    //     fontFamily: CONFIG.defaultFontFamily,
    //   },
    //   { overwrite: false },
    // );

    // Mandatory additions
    tileData.author = game.user._id;

    // Tool-based settings
    // switch (tool) {
    //   case 'brush':
    //     data.type = CONST.DRAWING_TYPES.FREEHAND;
    //     data.points = [[0, 0]];
    //     data.bezierFactor = 0.5;
    //     break;
    // }
    return tileData;
  }
}
