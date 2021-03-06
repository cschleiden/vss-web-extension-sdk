// Type definitions for Microsoft Visual Studio Services v134.20180525.1751
// Project: https://www.visualstudio.com/integrate/extensions/overview
// Definitions by: Microsoft <vsointegration@microsoft.com>

/// <reference types='knockout' />
/// <reference types='jquery' />
/// <reference types='jqueryui' />
/// <reference types='q' />
/// <reference types='requirejs' />
/// <reference types='react' />
/// <reference types='mousetrap' />
/// <reference path='vss.d.ts' />
declare module "Charts/Contracts" {
/** Options for a chart, which can be auto-regulated by a chart Host. */
export interface ChartHostOptions {
    /** Control Width, expressed in pixels */
    width: number;
    /** Control Height, expressed in pixels */
    height: number;
}
/** Control API for charts, after creation. Dispose is the only supported capability at this time. */
export interface ChartControl {
    /** Allows the caller to request disposal on the control. */
    dispose(): void;
}
/** Placeholder for the Host to transport user-customizable coloring options. */
export interface ColorCustomizationOptions {
    /** Opt-in to use subdued Coloring.
    Interpreted as false by default. */
    useSubduedPalette?: boolean;
    /** A list of user-customized colorings. */
    customColors?: ColorEntry[];
    /** A rich color editing model. */
    colorDictionary?: ColorDictionary;
}
export interface ColorPair {
    foreground: string;
    background: string;
}
/** (Deprecated) Legacy Compat API… We don’t want 3rd parties dealing with this mess. They can support their own color customization without touching this. */
export interface FeatureColorProvider {
    getFeatureColor(key: string, isSubdued?: boolean): ColorPair;
}
/** (Deprecated) Manages Colors of Charts */
export interface ColorDictionary {
    toColorEntries(): ColorEntry[];
    getColorPair(key: string, colorIndex: number, isSubduedPalette?: boolean): ColorPair;
    /** Allows the caller to add color customization for the specified color */
    setColorPair(key: string, colorPair: ColorPair): void;
    /**Indicates if a user-customized Color Pair is associated with the requested key */
    hasCustomColorPair(key: string): boolean;
    /** Indicates if any user-customizations of color pairs are present. */
    hasCustomColors(): boolean;
    clearCustomColors(): void;
}
/**
 * A key value pair for a user selected color preference.
 * Foreground color is omitted because it is mapped from matching background Color.
 */
export interface ColorEntry {
    /** The key for the color entry */
    value: string;
    /** The background hex color value for this entry */
    backgroundColor: string;
}
/** Provides context about the click event.
 *  Note: Data guarantees for the shape of event are very limited due to extensive diversity of chart types and input event formats.
 *  Consumers of these events must exercise care in handling incoming events, as subsets of properties can be omitted for some scenarios.
 */
export interface ClickEvent {
    /** The Chart control which originate this event. */
    sourceChart: any;
    /** The x-axis label entry associated with the evented item */
    labelName?: string;
    /** The name of the series of the evented item */
    seriesName?: string;
    /** The index of the clicked target in the series data array */
    seriesDataIndex?: number;
    /** The custom data that is defined as part of the series */
    seriesCustomData?: any;
    /** The name of this specific item */
    itemName?: string;
    /** The x-value or X-axis array position of the evented item*/
    itemX: number;
    /** The y-value or y-axis array index of the evented item */
    itemY?: number;
    /** z-value of the evented item, in 3-tuple views such as Pivot Table. */
    itemZ?: number;
    /** Browser-space X-coordinate of the event */
    clientX?: number;
    /** Browser-space Y-coordinate of the event */
    clientY?: number;
    /** The mouse button user clicked (as obtained from a JQuery MouseEvent: 1 = left, 2 = middle, 3 = right) */
    button?: number;
    /** True if the ctrl key is pressed */
    ctrlKey?: boolean;
}
export interface LegendClickEvent {
}
export interface LegendOptions {
    /** Opt-out option for suppressing rendering of legend. */
    enabled?: boolean;
    /** Opt-in option for restricting Legend label sizes. False by default.*/
    limitLabelSize?: boolean;
    /** Opt-in option for placing legend as a right aligned vertical stack. */
    /** This option is maintained for legacy compat purposes only. */
    /** The following options should be used henceforth: stackVertically */
    rightAlign?: boolean;
    /** Opt-in option for placing legend as a vertical stack. False by default.*/
    stackVertically?: boolean;
    /** Opt-in option for alignment of the horizontal stack.*/
    /** Valid values are: 'left', 'right', 'center' */
    /** Note that this option is not supported if 'stackVertically' option is true.*/
    align?: string;
}
export interface TooltipOptions {
    /** (Opt-in) If set to false, It disables the tooltip and mouse tracking. Defaults to true. */
    enabled?: boolean;
    /** Opt-in option for limiting tooltips to just the selected series. This is relevant for "busy" charts which have a large/unwieldly set of series (e.g. CFD).*/
    onlyShowFocusedSeries?: boolean;
    /** Opt-in to reverse the display order of the tooltip series. */
    reverseSeries?: boolean;
    /** Mapping function to convert data points to the line items used for building the tooltip. */
    customTooltipMapping?: (points: DataPoint[]) => TooltipLineItem[];
    /** Formatter to override the header text in the tooltip. */
    customTooltipHeader?: (category: string | number) => string | number;
}
/** A representation of a data point passed to customTooltipMapping in TooltipOptions if one is defined */
export interface DataPoint {
    /**
     * The values of the data point provided in an array. Most charts will only have one value in the array.
     * AreaRange charts pack 2 items of data: the yAxis low value and the yAxis high value.
     */
    values: string[];
    /** The name of the series the data point is a part of. */
    seriesName: string;
    /** The color associated with the data point. */
    color: string;
    /**
     * Custom data provided in the series.
     * This data is passed along to customTooltipMapping for building the tooltip.
     * Useful for building custom tooltips with additional information not provided by the chart SDK.
     */
    seriesCustomData?: any;
    /**
     * The index of the data point in the series data values array.
     * Useful for looking up a particular value in seriesCustomData if, for example, the
     * custom data provided is an array of values, each being an object associated with an individual
     * series data point.
     */
    seriesDataIndex: number;
}
export interface TooltipLineItem {
    /**
    * The style of the colored marker for the line item.
    * If omitted, only the text will be printed.
    */
    styleType?: TooltipStyleType;
    /** The text to print in the tooltip for this line item. */
    text: string;
}
export interface TooltipStyleType {
    /** The color of the line item marker */
    color: string;
    /** Render custom style of the line item marker */
    renderCustomStyle?: (tooltipStyleType: TooltipStyleType) => string;
    /** Custom tooltip data necessary for rendering */
    customTooltipData?: IDictionaryStringTo<any>;
    /** The type of line item marker. If type or renderCustomStyle is not specified, type defaults to Bar. */
    type?: TooltipLineItemMarkerType;
}
export enum TooltipLineItemMarkerType {
    Bar = 0,
    Square = 1,
}
/** Chart options for use only when rendering a pie chart */
export interface PieChartOptions {
    /**
     * Opt-in parameter to show aggregrate total value in center of pie and individual data labels.
     * Note: The centered label placement is tested against auto-centered and absolutely positioned pies.
     * Any unusual layout scenarios should be aggressively tested.
     * A value of null or undefined shows the slice data labels but not the value in the center of the pie.
     * A value of true shows the slice data labels and shows the value in the center of the pie.
     * A value of false hides the slice data labels and hides the value in the center of the pie.
     */
    showLabels?: boolean;
    /**
     * The size of the outer pie, expressed in pixels or percent of available chart space.
     */
    size?: string;
    /**
     * The size of the inner diameter for the pie. A size greater than 0 renders a donut chart.
     * Percentage values are relative to the pie size.
     */
    innerSize?: string;
    /**
     * Absolutely positioned center of pie chart, expressed in pixels. Opt-in.
     * Default position is visual center, discounting for space given to the legend, can be expressed as [null, null].
     * This is significant for charts which need consistent positioning, regardless of variable legend size.
     *
     */
    center?: number[];
}
/** Chart options for use only when rendering a line chart */
export interface LineChartOptions {
    /**
    * For line chart, this is opt-in for showing point markers
    * This will be moved to specialized options
    */
    includeMarkers?: boolean;
}
/** Chart options for use only when rendering a hybrid chart*/
export interface HybridChartOptions {
    /** A list of chart types associated to each series.
      * The type selected here determines the type used for rendering each corresponding series.
      * If this array is incomplete, line type is applied by default.
      */
    chartTypes: string[];
}
/** Chart options for use only when rendering an area chart */
export interface AreaChartOptions {
    /**
     * A separate color for the graph line. By default the line takes the color of the series,
     * but the lineColor setting allows setting a separate color for the line without altering the fillColor.
     */
    lineColor?: string;
}
export interface AxisOptions {
    labelValues?: any[];
    /** A hint for describing how label data from this axis should be formatted for presentation. */
    labelFormatMode?: LabelFormatModes;
    /** Opt-out option for suppressing rendering of labels.
        Labels are enabled by default.*/
    labelsEnabled?: boolean;
    /** Opt-out option for suppressing rendering of axis lines/tick markings.
        Markings are enabled by default.
        This option should really only be used for small-form chart experiences. */
    markingsEnabled?: boolean;
    /** Plain text title for the title. Null implies no title.
        Where it is present, this parameter is html encoded. */
    title?: string;
    /** The minimum value of the axis. If unset, a min value is automatically calculated.
        If the startOnTick option is true, which it is by default, the rendered min value of the axis
        will be a value less than or equal to this value that is as close as possible yet maintains
        an aesthetically pleasing spacing of axis ticks. */
    min?: number;
    /** The maximum value of the axis. If unset, a max value is automatically calculated.
        If the endOnTick option is true, which it is by default, the rendered max value of the axis
        will be a value greater than or equal to this value that is as close as possible yet maintains
        an aesthetically pleasing spacing of axis ticks. */
    max?: number;
    /** Opt-in option to update the axis min value when a legend item is shown/hidden.
        NOTE: Currently only respected for the y-axis. */
    updateMinOnLegendClick?: boolean;
    /** Whether to allow decimals in this axis' ticks
        Implementation defaults to true, override as needed*/
    allowDecimals?: boolean;
    /** Optional labelling elements for annotating points on the axis. Currently, only supported for use with X-Axis.  */
    annotationLines?: AxisAnnotationLine[];
    /** Opt-out option determining if the axis starts on a tick.
        Implementation defaults to true, override as needed */
    startOnTick?: boolean;
    /** Opt-out option determining if the axis ends on a tick..
        Implementation defaults to true, override as needed */
    endOnTick?: boolean;
    /**Opt-in parameter to prevent truncation of label to 11 characters,
        which is on by default. */
    suppressLabelTruncation?: boolean;
    /**
     *  Opt-in parameter to force rendering of chart content to very start and end of the axis, by hinting those portions to renderer out as "omitted".
     *  Default behavior on x-axis provides half a unit of space before and after the chart body.
     *  Note: This mechanism is a workaround, which does not auto-correct for neccessary reaction on dependent (y) axis.
     *  In particular, caller must explicitly ensure min and max y-axis value range accurately & tastefully reflect entire series, as stock implementation does not account for this.
     *
     *  If your scenario doesn't strictly require this, stick with default behavior.
     */
    renderToEdges?: boolean;
    /** Opt-in option determining if the user can zoom by dragging the mouse on this axix */
    canZoom?: boolean;
}
/** Describes annotation lines to be rendered over the chart. */
export interface AxisAnnotationLine {
    /**
     * The annotation label to show with the line.
     */
    labelText: string;
    /**
     * The color of the label text.
     * Defaults to black.
     */
    labelColor?: string;
    /**
     * The color of the annotation line.
     * Defaults to black.
     */
    lineColor?: string;
    /**
     * Position of the line, in axis units of the chart.
     */
    axisPosition: number;
}
export interface DataSeries {
    /** Name of the series, for presentation in legend, tooltips and events.
        Where present, names are html encoded.*/
    name?: string;
    /** Color of the series. Where present, this string is html encoded. */
    color?: string;
    /** The data elements in the series. Individual elements can be expressed as numeric, datum type or 3 element arrays. */
    data: (number | Datum | number[])[];
    /** Additional data values that can be assigned to the series. The data is accessible as part of custom tooltip mapping and click events.
        This is useful for rendering addional data not provided by the charting SDK in tooltips or for click events to perform more complex actions. */
    customData?: any[];
    /** Opt-in for mapping the values to the secondary axis of the chart.*/
    useSecondaryAxis?: boolean;
    /** The symbol to use when drawing the marker for the series
        null, "circle", "square", "diamond", "triangle" "triangle-down" or "url(graphic.png)" */
    markerType?: string;
    /** The size to use when drawing a chart marker for the series. */
    markerRadius?: number;
    /** Opt-in for disable the showing of the tooltip, default is true */
    enableTooltip?: boolean;
    /** For "stacked" chart scenarios: A string key for grouping series together for rendering in a common stack, when the key matches. Series using different key here will be rendered as neighboring stacks. */
    stackGroup?: string;
}
export interface Datum {
    /** Name of this datum sample for presentation in legend, tooltips and events */
    name?: string;
    y?: number;
    color?: string;
}
/** Strongly typed contract for configuring chart controls. The base contracts are common across charts.
Note: untrusted string inputs are force encoded(). If your feature requires particular data handling or the ability to reliably round-trip from events, please pre-encode your input.*/
export interface ChartOptions {
    /** General Presentation options managed by the chart host. e.g width & height */
    hostOptions?: ChartHostOptions;
    /** Color customization options from user, as managed in the chart editor.*/
    colorCustomizationOptions?: ColorCustomizationOptions;
    /**Opt-out parameter to prevent animation, which is on by default. */
    suppressAnimation?: boolean;
    /** Handler for click on chart series content. */
    click?: (clickEvent: ClickEvent) => void;
    /**Handler for chart legend click event. Can return false to supress default behavior.*/
    legendClick?: (clickEvent: LegendClickEvent) => boolean;
    /** Options for configuring the legend. Notably, visibility and placement */
    legend?: LegendOptions;
    /** Options for configuring the Tooltip. */
    tooltip?: TooltipOptions;
    /** If True, margin between the outer edge of the chart and the plot area will be set to 0
        False will use default margin values*/
    suppressMargin?: boolean;
    /** (opt-in) If true, the alternate tabular representation of the chart will be rendered.
        This is a debugging aid to help validate tabular rendering.
        Note: Only minimal "data" centric options are honored in this mode. Visual/layout options are definitively ignored. */
    showAccessibleForm?: boolean;
    /**Container for passing type-specific chart options. */
    specializedOptions?: PieChartOptions | LineChartOptions | HybridChartOptions | AreaChartOptions | FunnelChartOptions;
    /**Title of the chart. This helps in distinguishing if there are multiple charts on the same page.
       Used for describing the chart in accessible rendering mode. */
    title?: string;
}
export interface CommonChartOptions extends ChartOptions {
    /** The type of the chart. Constants are defined in ChartTypes class. */
    chartType?: string;
    /** Options to configure the "independent" or "category" x-Axis. This is used for presentation of "categories" or "independent variables". */
    xAxis?: AxisOptions;
    /** Options to configure the y-Axis. This is used for presentation of "values" or "dependent variables". */
    yAxis?: AxisOptions;
    /** Options to configure the secondary y-Axis. */
    yAxisSecondary?: AxisOptions;
    /** Data series representation chart Data */
    series: DataSeries[];
}
/**
 * Declaration of Chart types rendered from the common implementation.
 * Ultimately, we'll use this for supplanting series scoped typing.
 */
export class ChartTypesConstants {
    static Pie: string;
    static Bar: string;
    static StackedBar: string;
    static Column: string;
    static StackedColumn: string;
    static Histogram: string;
    static Area: string;
    static StackedArea: string;
    static Line: string;
    static Scatter: string;
    static AreaRange: string;
    /** A styled table which constrains itself to available fixed size allocation.
        Rows & Columns are given variable proportional subdivisions.
    */
    static Table: string;
    /** A Hybrid chart which renders the first series as columns, and subsequent series as line chart. */
    static ColumnLine: string;
    /** A flexible chart which renders the charts using the chart types specified via the customOptions.chartTypes array. */
    static Hybrid: string;
    static Funnel: string;
}
export class LabelFormatModes {
    static Textual: string;
    static Linear: string;
    /** Formats chart dates at granularity of day-month scale.*/
    static DateTime_DayInMonth: string;
    /** Formats the number of seconds in the hh:mm:ss format.*/
    static NumberSeconds_HourMinuteSeconds: string;
}
export class ChartColorizer {
    static Transparent: string;
}
/** Chart options for use only when rendering a funnel chart */
export interface FunnelChartOptions {
    /**
    * The height of the neck, the lower part of the funnel. A number defines pixel width, a percentage string defines a
    * percentage of the plot area height.
    * @default '25%'
    */
    neckHeight?: number | string;
    /**
    * The width of the neck, the lower part of the funnel. A number defines pixel width, a percentage string defines a
    * percentage of the plot area width.
    * @default '30%'
    */
    neckWidth?: number | string;
    /**
     * The height of the funnel. If it is a number it defines the pixel height, if it is a percentage string
     * it is the percentage of the plot area height.
     */
    height?: number | string;
    /**
     * The width of the funnel compared to the width of the plot area, or the pixel width if it is a number.
     * @default '90%'
      */
    width?: number | string;
}
}
declare module "Charts/Services" {
import Contracts_Platform = require("VSS/Common/Contracts/Platform");
import Contracts_Charts = require("Charts/Contracts");
export interface IChartsService {
    getCurrentVersion(): string;
    createChart($container: JQuery, options: Contracts_Charts.CommonChartOptions): void;
}
export module ChartsService {
    var contributionId: string;
    /**
    * Get an instance of the charting service
    *
    * @param webContext Optional web context to scope the service to
    */
    function getService(webContext?: Contracts_Platform.WebContext): IPromise<IChartsService>;
}
}
