import { log, LogLevel } from "./logging";

/**
 * A Splat is an implementation of PlaceableObject which represents a static piece of artwork or prop within the Scene.
 * Tiles are drawn above the {@link BackroundLayer} but below the {@link TokenLayer}.
 * @extends {PlaceableObject}
 *
 * @example
 * Splat.create({
 *   img: "path/to/tile-artwork.png",
 *   width: 300,
 *   height: 300,
 *   scale: 1,
 *   x: 1000,
 *   y: 1000,
 *   z: 370,
 *   rotation: 45,
 *   hidden: false,
 *   locked: true
 * });
 *
 * @see {@link TilesLayer}
 * @see {@link TileSheet}
 * @see {@link TileHUD}
 */
class Splat extends Tile {
  static container: any;
  constructor(...args) {
    super(...args);

    // Clean initial data
    //this._cleanData();

    /**
     * The Splat border frame
     * @type {PIXI.Container|null}
     */
    this.frame = null;

    /**
     * The Splat image container
     * @type {PIXI.Container|null}
     */
    this.container = null;

    /**
     * The primary tile image texture
     * @type {PIXI.Texture|null}
     */
    this.texture = null;


    this.data = {
      "splats": [
        {
          "x": 52,
          "y": 4,
          "angle": 303,
          "width": 115.16417694091797,
          "height": 141,
          "glyph": "c"
        },
        {
          "x": 49,
          "y": 0,
          "angle": 89,
          "width": 72.37313079833984,
          "height": 141,
          "glyph": "S"
        },
        {
          "x": 38,
          "y": 4,
          "angle": 315,
          "width": 44.55223846435547,
          "height": 141,
          "glyph": "*"
        },
        {
          "x": 0,
          "y": 16,
          "angle": 65,
          "width": 70.07462310791016,
          "height": 141,
          "glyph": "u"
        }
      ],
      "styleData": {
        "fontFamily": "WC Rhesus A Bta",
        "fontSize": 110,
        "fill": "rgba(138, 7, 7, 0.7)",
        "align": "center"
      },
      "offset": {
        "x": -35,
        "y": -86
      },
      "x": 1015,
      "y": 64,
      "maskPolygon": [
        -201.37014619445802,
        85.99999999999997,
        -200.07528580178825,
        61.292591855942646,
        -196.20489138520793,
        36.85588324586928,
        -189.80136779587735,
        12.95760786302165,
        -180.93487337826457,
        -10.140399786470027,
        -169.7025513006422,
        -32.18507309722908,
        -156.22746523420733,
        -52.934886015318256,
        -140.65725104174658,
        -72.16249924822966,
        -123.16249924822955,
        -89.65725104174669,
        -103.93488601531817,
        -105.22746523420733,
        -83.18507309722895,
        -118.70255130064228,
        -61.14039978646997,
        -129.93487337826463,
        -38.042392136978265,
        -138.80136779587738,
        -14.144116754130664,
        -145.20489138520796,
        10.292591855942646,
        -149.07528580178825,
        35,
        -150.370146194458,
        59.707408144057354,
        -149.07528580178823,
        84.14411675413066,
        -145.20489138520796,
        108.04239213697838,
        -138.80136779587735,
        131.14039978646997,
        -129.93487337826463,
        153.18507309722918,
        -118.70255130064223,
        173.93488601531817,
        -105.22746523420733,
        193.16249924822978,
        -89.65725104174663,
        210.6572510417468,
        -72.16249924822961,
        226.22746523420733,
        -52.934886015318256,
        239.7025513006422,
        -32.18507309722895,
        250.93487337826468,
        -10.140399786469914,
        259.80136779587747,
        12.957607863021764,
        266.20489138520793,
        36.85588324586931,
        270.07528580178814,
        61.29259185594279,
        271.3701461944579,
        86.00000000000011,
        270.07528580178814,
        110.7074081440573,
        266.20489138520793,
        135.14411675413078,
        259.80136779587724,
        159.04239213697844,
        250.93487337826468,
        182.14039978647,
        239.7025513006422,
        204.18507309722906,
        226.22746523420733,
        224.93488601531828,
        210.65725104174658,
        244.16249924822966,
        193.16249924822955,
        261.6572510417467,
        173.93488601531817,
        277.22746523420733,
        153.18507309722895,
        290.7025513006423,
        131.14039978646997,
        301.9348733782646,
        108.04239213697838,
        310.80136779587735,
        84.14411675413066,
        317.204891385208,
        59.707408144057126,
        321.07528580178825,
        35,
        322.370146194458,
        10.292591855942646,
        321.07528580178825,
        -14.144116754130778,
        317.20489138520793,
        -38.042392136978265,
        310.80136779587735,
        -61.140399786470084,
        301.93487337826457,
        -83.18507309722906,
        290.70255130064226,
        -103.9348860153184,
        277.2274652342072,
        -123.16249924822978,
        261.6572510417466,
        -140.6572510417467,
        244.1624992482296,
        -156.22746523420744,
        224.93488601531806,
        -169.7025513006423,
        204.1850730972289,
        -180.93487337826468,
        182.14039978646994,
        -189.80136779587747,
        159.04239213697815,
        -196.20489138520793,
        135.1441167541306,
        -200.07528580178825,
        110.70740814405724
      ],
      "id": "bng__177066395c4_0.844fc02d550df8"
    };  
  }

  /* -------------------------------------------- */

  /** @override */
  static get embeddedName() {
    return 'Splat';
  }

  /** @extends {Entity.createEmbeddedEntity} */
  static async create(data, options) {
    const created = await canvas.scene.createEmbeddedEntity(this.embeddedName, data, options);
    if ( !created ) return;
    if ( created instanceof Array ) {
      return created.map(c => this.layer.get(c._id));
    } else {
      return this.layer.get(created._id);
    }
  }


  /* -------------------------------------------- */

  /**
   * Apply initial sanitizations to the provided input data to ensure that a Splat has valid required attributes.
   * @private
   */
  // _cleanData() {
  //   // Constrain dimensions
  //   this.data.width = this.data.width.toNearest(0.1);
  //   this.data.height = this.data.height.toNearest(0.1);

  //   // Constrain canvas coordinates
  //   if (!canvas || !this.scene?.active) return;
  //   const d = canvas.dimensions;
  //   const minX = 0 - (this.data.width - d.size);
  //   const minY = 0 - (this.data.height - d.size);
  //   const maxX = d.width - d.size;
  //   const maxY = d.height - d.size;
  //   this.data.x = Math.clamped(this.data.x.toNearest(0.1), minX, maxX);
  //   this.data.y = Math.clamped(this.data.y.toNearest(0.1), minY, maxY);
  // }


  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @override */
  static async draw() {
    this.clear();

    // Create the outer frame for the border and interaction handles
    super.frame = this.addChild(new PIXI.Container());
    this.frame.border = this.frame.addChild(new PIXI.Graphics());
    this.frame.handle = this.frame.addChild(new ResizeHandle([1, 1]));


    let data = {styleData:null};

    // Create the tile container and it's child elements
    this.container = this.addChild(new PIXI.Container());

    const style = new PIXI.TextStyle(data.styleData);
    // all scene splats have a .maskPolgyon.
    if (data.maskPolygon) {
      data.splats.forEach((splat) => {
        const text = new PIXI.Text(splat.glyph, style);
        text.x = splat.x + splat.width / 2;
        text.y = splat.y + splat.height / 2;
        text.pivot.set(splat.width / 2, splat.height / 2);
        text.angle = splat.angle;
        this.container.addChild(text);
        return text;
      });

      log(LogLevel.DEBUG, 'drawSceneSplats: splatDataObj.maskPolygon');
      const sightMask = new PIXI.Graphics();
      sightMask.beginFill(1, 1);
      sightMask.drawPolygon(data.maskPolygon);
      sightMask.endFill();
      container.addChild(sightMask);
      container.mask = sightMask;

      container.x = data.x;
      container.y = data.y;
      container.alpha = data.alpha || 1;
      // we don't want to save alpha to flags
      delete data.alpha;
      canvas.blood.addChild(container);

      //if it's in the pool already update it otherwise add new entry
      if (existingIds.includes(data.id))
        BloodNGuts.scenePool.find((p) => p.data.id === data.id).container = container;
      else BloodNGuts.scenePool.push({ data: data, container: container });
    } else {
      log(LogLevel.ERROR, 'drawSceneSplats: splatDataObject has no .maskPolygon!');
    }
  }static clear() {
    throw new Error("Method not implemented.");
  }
static addChild(arg0: PIXI.Container): any {
    throw new Error("Method not implemented.");
  }
);


    if (this.data.img) {
      this.texture = await loadTexture(this.data.img, { fallback: 'icons/svg/hazard.svg' });
      this.tile.img = this.tile.addChild(this._drawPrimarySprite(this.texture));
      this.tile.bg = null;
    } else {
      this.texture = null;
      this.tile.img = null;
      this.tile.bg = this.addChild(new PIXI.Graphics());
    }

    // Refresh the current display
    this.refresh();

    // Enable interactivity, only if the Splat has a true ID
    if (this.id) this.activateListeners();
    return this;
  }

  /* -------------------------------------------- */

  /** @override */
  refresh() {
    // Set Splat position
    this.position.set(this.data.x, this.data.y);
    const aw = Math.abs(this.data.width);
    const ah = Math.abs(this.data.height);

    // Draw the sprite image
    let bounds = null;
    if (this.data.img) {
      const img = this.tile.img;

      // Set the tile dimensions and mirroring
      img.width = aw;
      if (this.data.width * img.scale.x < 0) img.scale.x *= -1;
      img.height = ah;
      if (this.data.height * img.scale.y < 0) img.scale.y *= -1;

      // Pivot in the center of the container
      img.anchor.set(0.5, 0.5);
      img.position.set(aw / 2, ah / 2);
      img.rotation = toRadians(this.data.rotation);

      // Toggle tile visibility
      img.alpha = this.data.hidden ? 0.5 : 1.0;
      bounds = this.tile.getLocalBounds(undefined, true);
    }

    // Draw a temporary background
    else {
      bounds = new NormalizedRectangle(0, 0, this.data.width, this.data.height);
      this.tile.bg.clear().beginFill(0xffffff, 0.5).drawShape(bounds);
      this.tile.bg.visible = true;
    }

    // Allow some extra padding to detect handle hover interactions
    this.hitArea = this._controlled ? bounds.clone().pad(20) : bounds;

    // Update border frame
    this._refreshBorder(bounds);
    this._refreshHandle(bounds);

    // Set visibility
    this.alpha = 1;
    this.visible = !this.data.hidden || game.user.isGM;
    return this;
  }

  /* -------------------------------------------- */

  /**
   * Refresh the display of the Splat border
   * @private
   */
  _refreshBorder(b) {
    const border = this.frame.border;

    // Determine border color
    const colors = CONFIG.Canvas.dispositionColors;
    let bc = colors.INACTIVE;
    if (this._controlled) {
      bc = this.data.locked ? colors.HOSTILE : colors.CONTROLLED;
    }

    // Draw the tile border
    const t = CONFIG.Canvas.objectBorderThickness;
    const h = Math.round(t / 2);
    const o = Math.round(h / 2);
    border
      .clear()
      .lineStyle(t, 0x000000, 1.0)
      .drawRoundedRect(b.x - o, b.y - o, b.width + h, b.height + h, 3)
      .lineStyle(h, bc, 1.0)
      .drawRoundedRect(b.x - o, b.y - o, b.width + h, b.height + h, 3);
    border.visible = this._hover || this._controlled;
  }

  /* -------------------------------------------- */

  /**
   * Refresh the display of the Splat resizing handle
   * @private
   */
  _refreshHandle(b) {
    this.frame.handle.refresh(b);
    this.frame.handle.visible = this._controlled && !this.data.locked;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners() {
    super.activateListeners();
    this.frame.handle
      .off('mouseover')
      .off('mouseout')
      .off('mousedown')
      .on('mouseover', this._onHandleHoverIn.bind(this))
      .on('mouseout', this._onHandleHoverOut.bind(this))
      .on('mousedown', this._onHandleMouseDown.bind(this));
    this.frame.handle.interactive = true;
  }

  /* -------------------------------------------- */
  /*  Database Operations                         */
  /* -------------------------------------------- */

  /** @override */
  _onUpdate(data) {
    const changed = new Set(Object.keys(data));
    if (changed.has('z')) {
      this.zIndex = parseInt(data.z) || 0;
    }

    // Release control if the Splat was locked
    if (data.locked) this.release();

    // Full re-draw or partial refresh
    if (changed.has('img')) return this.draw();
    this.refresh();

    // Update the sheet, if it's visible
    if (this._sheet && this._sheet.rendered) this.sheet.render();
  }

  /* -------------------------------------------- */
  /*  Interactivity                               */
  /* -------------------------------------------- */

  /** @override */
  _canHUD(user, event) {
    return this._controlled;
  }

  /* -------------------------------------------- */

  /** @override */
  _canConfigure(user, event) {
    if (this.data.locked && !this._controlled) return false;
    return super._canConfigure(user);
  }

  /* -------------------------------------------- */

  /** @override */
  _onDragLeftStart(event) {
    if (this._dragHandle) return this._onHandleDragStart(event);
    return super._onDragLeftStart(event);
  }

  /* -------------------------------------------- */

  /** @override */
  _onDragLeftMove(event) {
    if (this._dragHandle) return this._onHandleDragMove(event);
    return super._onDragLeftMove(event);
  }

  /* -------------------------------------------- */

  /** @override */
  _onDragLeftDrop(event) {
    if (this._dragHandle) return this._onHandleDragDrop(event);
    return super._onDragLeftDrop(event);
  }

  /* -------------------------------------------- */

  /** @override */
  _onDragLeftCancel(event) {
    if (this._dragHandle) return this._onHandleDragCancel(event);
    return super._onDragLeftCancel(event);
  }

  /* -------------------------------------------- */
  /*  Resize Handling                             */
  /* -------------------------------------------- */

  /**
   * Handle mouse-over event on a control handle
   * @param {PIXI.interaction.InteractionEvent} event   The mouseover event
   * @private
   */
  _onHandleHoverIn(event) {
    const handle = event.target;
    handle.scale.set(1.5, 1.5);
    event.data.handle = event.target;
  }

  /* -------------------------------------------- */

  /**
   * Handle mouse-out event on a control handle
   * @param {PIXI.interaction.InteractionEvent} event   The mouseout event
   * @private
   */
  _onHandleHoverOut(event) {
    event.data.handle.scale.set(1.0, 1.0);
  }

  /* -------------------------------------------- */

  /**
   * When we start a drag event - create a preview copy of the Splat for re-positioning
   * @param {PIXI.interaction.InteractionEvent} event   The mousedown event
   * @private
   */
  _onHandleMouseDown(event) {
    if (!this.data.locked) {
      this._dragHandle = true;
      const { x, y, width, height } = this.data;
      this._original = { x, y, width, height };
      Object.freeze(this._original);
    }
  }

  /* -------------------------------------------- */

  /**
   * Handle the beginning of a drag event on a resize handle
   * @param event
   * @private
   */
  _onHandleDragStart(event) {
    const handle = event.data.handle;
    const aw = Math.abs(this.data.width);
    const ah = Math.abs(this.data.height);
    const x0 = this.data.x + handle.offset[0] * aw;
    const y0 = this.data.y + handle.offset[1] * ah;
    event.data.origin = { x: x0, y: y0, width: aw, height: ah };
  }

  /* -------------------------------------------- */

  /**
   * Handle mousemove while dragging a tile scale handler
   * @param {PIXI.interaction.InteractionEvent} event   The mousemove event
   * @private
   */
  _onHandleDragMove(event) {
    const { destination, handle, origin, originalEvent } = event.data;

    // Pan the canvas if the drag event approaches the edge
    canvas._onDragCanvasPan(originalEvent);

    // Update Splat dimensions
    console.log(this.mouseInteractionManager.dragTime);
    const update = handle.updateDimensions(this._original, origin, destination, {
      aspectRatio: originalEvent.altKey ? this.aspectRatio : null,
    });
    mergeObject(this.data, update);
    this.refresh();
  }

  /* -------------------------------------------- */

  /**
   * Handle mouseup after dragging a tile scale handler
   * @param {PIXI.interaction.InteractionEvent} event   The mouseup event
   * @private
   */
  _onHandleDragDrop(event) {
    let { destination, handle, origin, originalEvent } = event.data;

    // Get snapped deltas
    if (!originalEvent.shiftKey) {
      destination = canvas.grid.getSnappedPosition(destination.x, destination.y, this.layer.gridPrecision);
    }

    // Update dimensions
    const update = handle.updateDimensions(this._original, origin, destination, {
      aspectRatio: originalEvent.altKey ? this.aspectRatio : null,
    });
    return this.update(update, { diff: false });
  }

  /* -------------------------------------------- */

  /**
   * Handle cancellation of a drag event for one of the resizing handles
   * @private
   */
  _onHandleDragCancel(event) {
    mergeObject(this.data, this._original);
    delete this._original;
    this._dragHandle = false;
    this.refresh();
  }

  /* -------------------------------------------- */

  /**
   * Create a preview tile with a background texture instead of an image
   * @return {Splat}
   */
  static createPreview(data) {
    const tile = new Splat(
      mergeObject(
        {
          x: 0,
          y: 0,
          rotation: 0,
          z: 0,
          width: 0,
          height: 0,
        },
        data,
      ),
    );
    tile._controlled = true;

    // Swap the tile and the frame
    tile.draw().then((t) => {
      tile.removeChild(tile.frame);
      tile.addChild(tile.frame);
    });
    return tile;
  }
}
